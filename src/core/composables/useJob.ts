import useDebounceFn from "@/core/composables/useDebounceFn";
import { useLoading } from "@/core/loading";
import JobState from "@/core/models/JobState";
import { catchError, map, Observable, of, Subject, Subscription } from "rxjs";
import { computed, onUnmounted, ref } from "vue";

type Fn<Result = any> = (...args: any) => Observable<Result>;

interface UseJobOptions {
  showLoading?: boolean;
  wait?: number;
  immediate?: boolean;
}

export default function useJob<T extends Fn>(fn: T, options?: UseJobOptions) {
  const { startLoading, stopLoading } = useLoading();

  const subject = ref(new Subject<Observable<any>>());
  const jobSubscription = ref<Subscription>();

  const state = ref<JobState>();
  const result = ref<ReturnType<T> extends Observable<infer R> ? R : any>();
  const error = ref<any>();

  const processing = computed(() => state.value === JobState.Processing);

  subject.value.subscribe({
    next: (observable) => {
      jobSubscription.value = observable.subscribe({
        next: (value) => {
          result.value = value;
        },
        complete: () => {
          state.value = JobState.Success;
          error.value = undefined;
          stopLoading();
        },
        error: (err) => {
          state.value = JobState.Failed;
          error.value = err;
          stopLoading();
        },
      });
    },
  });

  const runNextCall = (...args: Parameters<T>) => {
    state.value = JobState.Processing;
    subject.value.next(fn(...(args as any[])));
    if (options?.showLoading) {
      startLoading();
    }
  };

  const run =
    options?.wait !== 0
      ? useDebounceFn(runNextCall, {
          wait: typeof options?.wait === "number" ? options.wait : 100,
        }).run
      : runNextCall;

  const cancel = () => {
    jobSubscription.value?.unsubscribe();
    state.value = JobState.Standing;
    stopLoading();
  };

  if (options?.immediate) {
    run(...([] as Parameters<T>));
  }

  onUnmounted(() => {
    subject.value.unsubscribe();
    stopLoading();
  });

  return {
    run,
    cancel,
    state,
    processing,
    result,
    error,
  };
}

export function fnJob<T extends Fn>({
  api,
  fnSuccess,
  fnError,
  options,
}: {
  api: T;
  fnSuccess: (
    response: ReturnType<T> extends Observable<infer R> ? R : any
  ) => void;
  fnError?: (err: any) => any;
  options?: UseJobOptions;
}) {
  const {
    run: runJob,
    cancel,
    state,
    processing,
    result,
    error,
  } = useJob((...args: Parameters<T>) => {
    return api(...(args as any[])).pipe(
      map((response) => {
        fnSuccess(response);
      }),
      catchError((error: Promise<any>) => {
        fnError && fnError(error);
        return of(error);
      })
    );
  }, options);

  const run = (...args: Parameters<T>) => {
    runJob(...args);
  };

  return {
    run,
    cancel,
    state,
    processing,
    result,
    error,
  };
}

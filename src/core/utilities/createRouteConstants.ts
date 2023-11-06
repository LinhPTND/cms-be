import createRoutePath, {
  InputRoutePath,
} from "@/core/utilities/createRoutePath";
import { capitalize } from "lodash";

type JoinPath<
  Prefix extends string,
  A extends string,
  B extends string
> = Prefix extends "" ? `${A}.${B}` : `${Prefix}.${A}.${B}`;

type RoutePathNameOutput<
  Input extends InputRoutePath,
  Prefix extends string = "",
  K extends keyof Input = keyof Input
> = {
  [P in K]: Input[P] extends InputRoutePath
    ? RoutePathNameOutput<
        Input[P],
        JoinPath<"", Prefix, P extends string ? Capitalize<P> : "">
      >
    : JoinPath<"", Prefix, P extends string ? Capitalize<P> : "">;
};

function createRoutePathName<Input extends InputRoutePath, Name extends string>(
  name: Name,
  input: Input,
  prefix = ""
): RoutePathNameOutput<Input, Capitalize<Name>> {
  const output: any = {};

  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const path = input[key];
      prefix = prefix ? prefix : capitalize(name);
      if (typeof path === "string") {
        output[key] = `${prefix}.${capitalize(key)}`;
      } else {
        output[key] = createRoutePathName(
          name,
          path,
          `${prefix}.${capitalize(key)}`
        );
      }
    }
  }

  return output;
}

export default function createRouteConstants<
  Input extends InputRoutePath,
  Name extends string
>(name: Name, input: Input) {
  return {
    Paths: createRoutePath(input),
    Names: createRoutePathName(name, input),
  };
}

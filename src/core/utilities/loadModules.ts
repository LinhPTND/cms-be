import { sortBy } from "lodash";

export default function loadModules() {
  return new Promise<AppModule[]>((resolve, reject) => {
    try {
      const modules: Record<string, any> = import.meta.glob(
        "/src/modules/**/module.ts",
        {
          eager: true,
        }
      );

      const appModules: AppModule[] = [];

      for (const modulePath in modules) {
        if (Object.prototype.hasOwnProperty.call(modules, modulePath)) {
          const module = modules[modulePath];
          if (!module.default) {
            throw Error(`Module in path ${modulePath} has no export default`);
          }

          appModules.push(module.default as AppModule);
        }
      }

      resolve(sortBy(appModules, "order"));
    } catch (error) {
      reject(error);
    }
  });
}

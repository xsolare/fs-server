```bash
yarn add @types/node -D
```

_vite.config.ts_

```ts
import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  ...
  resolve: {
    alias: {
      "#": resolve(__dirname, "src"),
      "#components": resolve(__dirname, "src/components"),
      "#assets": resolve(__dirname, "src/assets"),
      "#types": resolve(__dirname, "src/types"),
      "#hooks": resolve(__dirname, "src/hooks"),
    },
  },
});
```

_tsconfig.json_

```json
{
  "compilerOptions": {
    ...
    "paths": {
      "#/*": ["./*"],
      "#components/*": ["./components/*"],
      "#assets/*": ["./assets/*"],
      "#types/*": ["./types/*"],
      "#hooks/*": ["./hooks/*"]
    }
  },
}
```

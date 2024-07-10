# Reproduction basic nextjs app and `@literalai/client`

This repo list some issues I encountered while trying to reproduce the [Literal AI SDK](https://github.com/literalai/sdk) in a basic Next.js app.
Those could be added in the doc or the problematic dependencies could be intgrated in another way.

## First issue

When calling the api route got the following error:

```sh
 ⨯ ./node_modules/onnxruntime-node/bin/napi-v3/darwin/arm64/onnxruntime_binding.node
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
(Source code omitted for this binary file)

```

The fix was the following:

- Installing the `node-loader` package
- Adding the following in the `next.config.mjs` file:

```diff
/** @type {import('next').NextConfig} */
const nextConfig = {
+  webpack: (config, { isServer }) => {
+    if (!isServer) {
+      // Fixes npm packages that depend on `fs` module
+      config.resolve.fallback.fs = false;
+    }
+    config.module.rules.push({
+      test: /\.node$/,
+      use: "node-loader",
+    });
+    return config;
+  },
};

export default nextConfig;
```

Fix by: https://github.com/xenova/transformers.js/issues/210

## Second issue

Unable to use `pnpm` (or `bun install`), got the following error:

```sh
 ⨯ Error: Missing tiktoken_bg.wasm
```

Fix: 

- Use `npm install`

Seems to come from a tokenizer binary

Similar known issue: https://github.com/transitive-bullshit/agentic/issues/570





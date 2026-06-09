import type { VariantMeta } from "./types.ts";

const VARIANT_METAS_KEY = "variantMetas";

export function variant(meta: VariantMeta) {
  return function (
    _target: unknown,
    context: ClassMethodDecoratorContext,
  ): void {
    context.metadata[VARIANT_METAS_KEY] ??= [];
    (context.metadata[VARIANT_METAS_KEY] as VariantMeta[]).push(meta);
  };
}

// deno-lint-ignore no-explicit-any
export function variantMetas(cls: new (...args: any[]) => any): VariantMeta[] {
  // deno-lint-ignore no-explicit-any
  const metadata = (cls as any)[Symbol.metadata];
  return (metadata?.[VARIANT_METAS_KEY] as VariantMeta[] | undefined) ?? [];
}

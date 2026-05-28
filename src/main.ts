import { Command } from "@cliffy/command";
import { Checkbox, Number as NumberPrompt } from "@cliffy/prompt";
import {
  getSizesForProblem,
  runBenchmarks,
  type SelectedVariant,
} from "./benchmark/run.ts";
import { createTableRenderer } from "./benchmark/table.ts";
import { registry } from "./registry.ts";

const algorithmLab = new Command()
  .name("algorithm-lab")
  .version("0.1.0")
  .description("Playground to explore algorithms benchmarking")
  .action(async () => {
    const formatCategory = (cat: string) =>
      cat.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

    const options: (ReturnType<typeof Checkbox.separator> | {
      name: string;
      value: string;
    })[] = [];

    let lastCategory = "";

    for (const [problemIndex, problem] of registry.entries()) {
      if (problem.category !== lastCategory) {
        options.push(
          Checkbox.separator(`── ${formatCategory(problem.category)} ──`),
        );
        lastCategory = problem.category;
      }

      options.push(Checkbox.separator(`  ${problem.name}:`));

      for (const [variantIndex, variant] of problem.variants.entries()) {
        options.push({
          name: `    ${variant.name} ${variant.bigO.time}`,
          value: `${problemIndex}:${variantIndex}`,
        });
      }
    }

    const selectedStrings = (await Checkbox.prompt({
      message: "Algorithms to benchmark",
      options,
      minOptions: 2,
    })) as unknown as string[];

    const selected: SelectedVariant[] = selectedStrings.map((s) => {
      const [p, v] = s.split(":").map((n) => parseInt(n, 10));
      return { problemIndex: p, variantIndex: v };
    });

    const iterations: number = await NumberPrompt.prompt({
      message: "Number of iterations",
      min: 1,
    });

    const groups = new Map<number, SelectedVariant[]>();
    for (const variant of selected) {
      const group = groups.get(variant.problemIndex) ?? [];
      group.push(variant);
      groups.set(variant.problemIndex, group);
    }

    for (const [problemIndex, variants] of groups) {
      const sizes = getSizesForProblem(problemIndex);
      const labels = variants.map(({ problemIndex: pi, variantIndex: vi }) => {
        const v = registry[pi].variants[vi];
        return `${v.name} ${v.bigO.time}`;
      });

      const problem = registry[problemIndex];
      const renderer = createTableRenderer(
        labels,
        sizes,
        `${formatCategory(problem.category)} / ${problem.name}`,
      );
      renderer.render();

      for await (const entry of runBenchmarks(variants, iterations)) {
        renderer.update(entry);
        renderer.render();
      }

      console.log();
    }
  });

try {
  await algorithmLab.parse(Deno.args);
} catch (error) {
  console.error(Deno.inspect(error, { colors: true }));
  Deno.exit(1);
}

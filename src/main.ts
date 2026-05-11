import { Command } from "@cliffy/command";
import { Checkbox, Number } from "@cliffy/prompt";
import { getSizesForAlgorithm, runBenchmarks } from "./benchmark/run.ts";
import { createTableRenderer } from "./benchmark/table.ts";

const algorithmLab = new Command()
  .name("algorithm-lab")
  .version("0.1.0")
  .description("Playground to explore algorithms benchmarking")
  .action(async () => {
    const selectedAlgorithms = await Checkbox.prompt({
      message: "Algorithms to benchmark",
      options: [
        Checkbox.separator("Search algorithms:"),
        { name: "Native", value: "nativeSearch" },
        { name: "Binary", value: "binarySearch" },
        { name: "Linear", value: "linearSearch" },
        Checkbox.separator("Sort algorithms:"),
        { name: "Native", value: "nativeSort" },
        { name: "Merge", value: "mergeSort" },
        { name: "Insertion", value: "insertionSort" },
        { name: "Selection", value: "selectionSort" },
      ],
      minOptions: 2,
    });

    const iterations: number = await Number.prompt({
      message: "Number of iterations",
      min: 1,
    });

    const groups = new Map<string, string[]>();
    for (const algo of selectedAlgorithms) {
      const sizes = getSizesForAlgorithm(algo);
      const key = sizes.join(",");
      const group = groups.get(key) ?? [];
      group.push(algo);
      groups.set(key, group);
    }

    for (const [, algorithmNames] of groups) {
      const sizes = getSizesForAlgorithm(algorithmNames[0]);

      const labels: string[] = [];
      for (const name of algorithmNames) {
        const entry = await resolveAlgorithmLabel(name);
        labels.push(entry);
      }

      const renderer = createTableRenderer(labels, sizes);
      renderer.render();

      for await (const entry of runBenchmarks(algorithmNames, iterations)) {
        renderer.update(entry);
        renderer.render();
      }

      console.log();
    }
  });

async function resolveAlgorithmLabel(name: string): Promise<string> {
  switch (name) {
    case "linearSearch": {
      const { linearSearch } = await import("./dsa/search/linear.ts");
      const s = linearSearch<number>();
      return `${s.name} ${s.bigO}`;
    }
    case "binarySearch": {
      const { binarySearch } = await import("./dsa/search/binary.ts");
      const s = binarySearch<number>();
      return `${s.name} ${s.bigO}`;
    }
    case "nativeSearch": {
      const { nativeSearch } = await import("./dsa/search/native.ts");
      const s = nativeSearch<number>();
      return `${s.name} ${s.bigO}`;
    }
    case "insertionSort": {
      const { insertionSort } = await import("./dsa/sort/insertion.ts");
      const s = insertionSort<number>();
      return `${s.name} ${s.bigO}`;
    }
    case "selectionSort": {
      const { selectionSort } = await import("./dsa/sort/selection.ts");
      const s = selectionSort<number>();
      return `${s.name} ${s.bigO}`;
    }
    case "mergeSort": {
      const { mergeSort } = await import("./dsa/sort/merge.ts");
      const s = mergeSort<number>();
      return `${s.name} ${s.bigO}`;
    }
    case "nativeSort": {
      const { nativeSort } = await import("./dsa/sort/native.ts");
      const s = nativeSort<number>();
      return `${s.name} ${s.bigO}`;
    }
    default:
      return name;
  }
}

try {
  await algorithmLab.parse(Deno.args);
} catch (error) {
  console.error(Deno.inspect(error, { colors: true }));
  Deno.exit(1);
}

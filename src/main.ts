import { Command } from "@cliffy/command";
import { Checkbox, Number } from "@cliffy/prompt";

const algorithmLab = new Command()
  .name("algorithm-lab")
  .version("0.1.0")
  .description("Playground to explore algorithms benchmarking")
  .action(async () => {
    const selectedAlgorithms = await Checkbox.prompt({
      message: "Algorithms to benchmark",
      options: [
        Checkbox.separator("Search algorithms:"),
        { name: "Linear", value: "linearSearch" },
        { name: "Binary", value: "binarySearch" },
        Checkbox.separator("Sort algorithms:"),
        { name: "Insertion", value: "insertionSort" },
        { name: "Selection", value: "selectionSort" },
        { name: "Merge", value: "mergeSort" },
        { name: "Native", value: "nativeSort" },
      ],
      minOptions: 2,
    });

    const iterations: number = await Number.prompt({
      message: "Number of iterations",
      min: 1,
    });

    const { runBenchmarks } = await import("./benchmark/run.ts");

    await runBenchmarks(selectedAlgorithms, iterations);
  });

try {
  await algorithmLab.parse(Deno.args);
} catch (error) {
  console.error(Deno.inspect(error, { colors: true }));
  Deno.exit(1);
}

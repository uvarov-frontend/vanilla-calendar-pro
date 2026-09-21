import { parseArgs } from 'node:util';

export const coreScenarios = [
  'init-month',
  'init-12-months',
  'set-selected-date',
  'set-selected-date-3-months',
  'set-selected-date-12-months',
  'navigate-month',
  'navigate-2-months',
  'navigate-3-months',
  'navigate-12-months',
  'navigate-12-months-prev',
  'navigate-12-months-step3',
  'set-large-disabled-ranges',
  'set-5000-unsorted-disabled-dates',
];

export const help = `Calendar performance checks (Node 22+, Git, tar and Chrome/Chromium).

pnpm test:performance [options]

  --baseline=HEAD                Git revision to compare with the working tree
  --suite=timing                 timing | checks | extended | all
  --samples=20                   Samples per version/scenario/CPU rate
  --rates=1,4,8                  Relative CDP CPU throttling
  --only=name,name               Timing scenarios (default: 13 core cases; all: all cases)
  --groups=memory,multiple,rapid,startup   Extended checks to run
  --quick                        3 samples, CPU 1x (smoke test, not a benchmark)
  --profile                      Save CPU profiles; requires a single --only scenario
  --output=/path/to/new-directory Results (default: a new OS temporary directory)
  --help                         Print this help without building or launching Chrome

Set CHROME_PATH if Chrome is not in a standard macOS/Linux location.
Both revisions are built in temporary directories using the installed dependencies.
See tests/performance/README.md for methodology and baseline selection.`;

export function configuration(args = process.argv.slice(2)) {
  const { values } = parseArgs({
    args,
    options: {
      baseline: { type: 'string', default: 'HEAD' },
      suite: { type: 'string', default: 'timing' },
      samples: { type: 'string' },
      rates: { type: 'string' },
      only: { type: 'string' },
      groups: { type: 'string', default: 'memory,multiple,rapid,startup' },
      quick: { type: 'boolean', default: false },
      profile: { type: 'boolean', default: false },
      output: { type: 'string' },
      help: { type: 'boolean', default: false },
    },
  });
  if (values.help) return { help: true };
  const samples = Number(values.samples ?? (values.quick ? 3 : 20));
  const rates = (values.rates ?? (values.quick ? '1' : '1,4,8')).split(',').map(Number);
  const groups = values.groups.split(',');
  if (!Number.isSafeInteger(samples) || samples < 1) throw new Error('--samples must be a positive integer.');
  if (!rates.length || rates.some((rate) => !Number.isFinite(rate) || rate < 1)) throw new Error('--rates must contain numbers >= 1.');
  if (!['timing', 'checks', 'extended', 'all'].includes(values.suite)) throw new Error('Unknown --suite.');
  if (groups.some((group) => !['memory', 'multiple', 'rapid', 'startup'].includes(group))) throw new Error('Unknown --groups entry.');
  const only = values.only === 'all' ? undefined : (values.only?.split(',') ?? coreScenarios);
  if (only?.some((name) => !name)) throw new Error('--only contains an empty scenario.');
  if (values.profile && (only?.length !== 1 || values.suite !== 'timing')) throw new Error('--profile requires --suite=timing and a single --only scenario.');
  return { ...values, samples, rates: [...new Set(rates)], groups: [...new Set(groups)], only };
}

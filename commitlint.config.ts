import type {
  Rule,
  RuleOutcome,
  UserConfig as CommitlintConfig,
} from '@commitlint/types';

const SUBJECT_ASCII = /^[\x20-\x7E]*$/;
const SCOPE_ASCII = /^[A-Za-z0-9_-]*$/;

const subjectAscii: Rule = (parsed, when = 'always'): RuleOutcome => {
  const subject = parsed.subject ?? '';
  const ok = SUBJECT_ASCII.test(subject);
  const valid = when === 'never' ? !ok : ok;

  return [
    valid,
    `subject должен содержать только английские символы (ASCII), получено: "${subject}"`,
  ];
};

const scopeAscii: Rule = (parsed, when = 'always'): RuleOutcome => {
  const scope = (parsed.scope ?? '').replace(/^\(|\)$/g, '');
  const ok = SCOPE_ASCII.test(scope);
  const valid = when === 'never' ? !ok : ok;

  return [
    valid,
    `scope должен содержать только английские символы (A-Za-z0-9_-), получено: "${scope}"`,
  ];
};

export default {
  rules: {
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'ai',
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'init',
        'perf',
        'refactor',
        'revert',
        'tests',
        'trash',
      ],
    ],
    'subject-ascii': [2, 'always'],
    'scope-ascii': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'subject-ascii': subjectAscii,
        'scope-ascii': scopeAscii,
      },
    },
  ],
  parserPreset: {
    parserOpts: {
      headerCorrespondence: ['type', 'scope', 'subject'],
      headerPattern:
        /^\[(ai|build|ci|docs|feat|fix|init|perf|refactor|revert|tests|trash)(\([^)]*\))?\]\s(.+)$/,
    },
  },
} satisfies CommitlintConfig;

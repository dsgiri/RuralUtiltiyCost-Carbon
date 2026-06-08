import { ToolDefinition } from '../types';

export const TOOLS: ToolDefinition[] = [
  {
    id: 'whole-farm',
    title: 'Whole-Farm Carbon Footprint',
    description: 'Estimate your complete greenhouse gas emissions across all farm operations.',
    category: 'whole-farm',
    primaryOutcome: 'Total CO2e footprint',
    path: '/footprint'
  },
  {
    id: 'enterprise-emissions',
    title: 'Enterprise Emissions Calculator',
    description: 'Break down carbon impact by specific enterprises (e.g., dairy, crop, beef).',
    category: 'enterprise',
    primaryOutcome: 'Emissions per enterprise',
    path: '/enterprises'
  },
  {
    id: 'soil-carbon',
    title: 'Soil Carbon & Sequestration',
    description: 'Model soil carbon potential and estimate sequestration impacts over time.',
    category: 'soil-carbon',
    primaryOutcome: 'Net sequestration estimate',
    path: '/soil-carbon'
  },
  {
    id: 'benchmark',
    title: 'Benchmark Comparison',
    description: 'Compare your farm\'s carbon intensity against regional targets or past years.',
    category: 'benchmarking',
    primaryOutcome: 'Benchmark comparison gap',
    path: '/benchmark'
  },
  {
    id: 'what-if',
    title: 'What-If Reduction Scenarios',
    description: 'Test practice changes to see their impact on your total carbon footprint.',
    category: 'what-if',
    primaryOutcome: 'Potential CO2e savings',
    path: '/what-if'
  },
  {
    id: 'mitigation',
    title: 'Mitigation Planner',
    description: 'Identify the top opportunities for emissions reduction on your farm.',
    category: 'mitigation',
    primaryOutcome: 'Hotspot action plan',
    path: '/mitigation'
  }
];

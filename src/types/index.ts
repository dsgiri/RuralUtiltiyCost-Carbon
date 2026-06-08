export type ToolCategory = 
  | 'whole-farm' 
  | 'enterprise' 
  | 'soil-carbon' 
  | 'benchmarking' 
  | 'what-if' 
  | 'mitigation' 
  | 'reporting';

export interface ToolDefinition {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  primaryOutcome: string;
  path: string;
}

export type CarbonEstimate = {
  source: string;
  value: number; // CO2e in tonnes usually
  unit: string;
  type: 'emissions' | 'sequestration';
};

export interface ComicPlanResponseData {
  data: Data;
}

export interface Data {
  characters: Character[];
  panels_flat: PanelsFlat[];
  plan: Plan;
}

export interface Character {
  name: string;
  role: string;
  traits: string[];
  visual_notes: string;
  image_prompt_en: string;
  palette: string[];
  image_url: string;
}

export interface PanelsFlat {
  chapter_number: number;
  page_number: number;
  panel_number: number;
  beat: string;
  details: string;
  scene_id: string;
}

export interface Plan {
  chapter_number: number;
  chapter_title: string;
  chapter_summary: string;
  fixed_pages: number;
  characters: Character[];
  page_plan: PagePlan[];
}

export interface PagePlan {
  page_number: number;
  goal: string;
  panels: Panel[];
}

export interface Panel {
  panel_number: number;
  scene_id: string;
  beat: string;
  details: string;
}

export type CardData = {
  label: string;
  path: string;
};

export type DataJson = {
  single: CardData[];
  multi: CardData[];
};

/**
 * data.jsonファイルを読み込む関数
 * @returns Promise<DataJson> - singleとmultiのカードデータ
 */
export const loadData = async (): Promise<DataJson> => {
  try {
    const response = await fetch('/data/data.json');
    
    if (!response.ok) {
      throw new Error(`Failed to load data.json: ${response.status}`);
    }
    
    const data: DataJson = await response.json();
    
    // データ構造の検証
    if (!data.single || !data.multi) {
      throw new Error('Invalid data structure: missing single or multi arrays');
    }
    
    return data;
  } catch (error) {
    console.error('Error loading data:', error);
    
    // フォールバック用のダミーデータ
    return {
      single: [
        { label: 'サンプル1', path: '/images/sample1.png' },
        { label: 'サンプル2', path: '/images/sample2.png' },
      ],
      multi: [
        { label: 'マルチ1', path: '/images/multi1.png' },
        { label: 'マルチ2', path: '/images/multi2.png' },
      ]
    };
  }
};

/**
 * singleモードのデータのみを取得
 * @returns Promise<CardData[]> - singleモードのカードデータ配列
 */
export const loadSingleData = async (): Promise<CardData[]> => {
  const data = await loadData();
  return data.single;
};

/**
 * multiモードのデータのみを取得
 * @returns Promise<CardData[]> - multiモードのカードデータ配列
 */
export const loadMultiData = async (): Promise<CardData[]> => {
  const data = await loadData();
  return data.multi;
};
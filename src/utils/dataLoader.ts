export type CardData = {
  label: string;
  path: string;
  category?: string;
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

  const baseUrl = import.meta.env.BASE_URL;
  const jsonPath = `${baseUrl}data/data.json`; // fetchのパス
  console.log('--- Debug: Attempting to fetch data.json from:', jsonPath);

  try {
    const response = await fetch(jsonPath);
    
    console.log('--- Debug: Fetch response status for data.json:', response.status, response.statusText); // デバッグ文を追加

    if (!response.ok) {
      console.error('--- Debug: Fetch response was NOT OK.');// デバッグ文を追加
      throw new Error(`Failed to load data.json: ${response.status}`);
    }
    
    const data: DataJson = await response.json();

    console.log('--- Debug: Successfully loaded data.json. Data:', data); // デバッグ文を追加
    
    // データ構造の検証
    if (!data.single || !data.multi) {
      console.error('--- Debug: Data structure is invalid.'); // デバッグ文を追加
      throw new Error('Invalid data structure: missing single or multi arrays');
    }

    // 各カードデータのパスにbaseUrlを付与
    const processedSingle = data.single.map(card => ({
      ...card,
      path: `${baseUrl}${card.path.startsWith('/') ? card.path.substring(1) : card.path}`
    }));
    const processedMulti = data.multi.map(card => ({
      ...card,
      path: `${baseUrl}${card.path.startsWith('/') ? card.path.substring(1) : card.path}`
    }));

    return {
      single: processedSingle,
      multi: processedMulti
    };

  } catch (error) {
    console.error('--- Debug: Error caught during data loading:', error); // デバッグ文を追加
    console.error('Error loading data:', error);
    
    // フォールバック用のダミーデータ
    return {
      single: [
        { label: 'やあん', path: '/images/single/ヤドン/やあん.PNG', category: 'ヤドン' },
      ],
      multi: [
        { label: 'やあん', path: '/images/single/ヤドン/やあん.PNG', category: 'ヤドン' },        { label: 'マルチ2', path: '/images/multi2.png' },
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
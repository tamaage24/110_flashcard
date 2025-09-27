import os
import json
import re
import random
from pathlib import Path

# ルートディレクトリの指定
PROJECT_ROOT = Path(__file__).parent.parent
IMAGES_DIR = PROJECT_ROOT / "public" / "images"
DATA_JSON_PATH = PROJECT_ROOT / "public" / "data" / "data.json"

def generate_single_data():
    single_dir = IMAGES_DIR / "single"
    single_data = []

    for category_dir in single_dir.iterdir():
        if category_dir.is_dir():
            category_name = category_dir.name
            for file_path in category_dir.iterdir():
                if file_path.is_file() and file_path.suffix.lower() in [".png", ".jpg", ".jpeg", ".gif"]:
                    label = file_path.stem
                    path = f"/images/single/{category_name}/{file_path.name}"
                    single_data.append({
                        "label": label,
                        "path": path,
                        "category": category_name
                    })
    return single_data

def generate_multi_data():
    multi_dir = IMAGES_DIR / "multi"
    multi_data = []

    for category_dir in multi_dir.iterdir():
        if category_dir.is_dir():
            category_name = category_dir.name
            numbered_files = []
            unnumbered_files = []

            for file_path in category_dir.iterdir():
                if file_path.is_file() and file_path.suffix.lower() in [".png", ".jpg", ".jpeg", ".gif"]:
                    match = re.match(r"^(\d+)_", file_path.stem)
                    if match:
                        number = int(match.group(1))
                        label = file_path.stem.split("_", 1)[1]
                        numbered_files.append((number, label, file_path.name))
                    else:
                        label = file_path.stem
                        unnumbered_files.append(file_path.name)

            # 数字付きは数字順にソート
            numbered_files.sort(key=lambda x: x[0])
            for number, label, filename in numbered_files:
                path = f"/images/multi/{category_name}/{filename}"
                multi_data.append({
                    "label": label,
                    "path": path,
                    "category": category_name
                })

            # 数字なしはランダム順
            random.shuffle(unnumbered_files)
            for filename in unnumbered_files:
                label = Path(filename).stem
                path = f"/images/multi/{category_name}/{filename}"
                multi_data.append({
                    "label": label,
                    "path": path,
                    "category": category_name
                })

    return multi_data

def main():
    data = {
        "single": generate_single_data(),
        "multi": generate_multi_data()
    }

    # data.json ディレクトリ作成（存在しない場合）
    DATA_JSON_PATH.parent.mkdir(parents=True, exist_ok=True)

    with open(DATA_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"data.json を生成しました: {DATA_JSON_PATH}")

if __name__ == "__main__":
    main()

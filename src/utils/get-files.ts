import fs from 'fs';
import path from 'path';

export interface IFile {
  id: string;
  path: string;
  type: string;
  name: string;
  extension: string | null;
  size: string | null;
  parentId: string | null;
}

export function getFiles(directory: string): IFile[] {
  const result: IFile[] = [];

  function traverseDirectory(dir: string, parentId: string | null) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      const fileInfo = {
        id: file,
        path: filePath,
        name: file,
        extension: null,
        size: null,
        parentId
      } as IFile;

      if (stats.isFile()) {
        result.push({
          ...fileInfo,
          type: 'file',
          extension: path.extname(filePath).slice(1, path.extname(filePath).length) ?? null,
          size: stats.size.toString()
        });
      }

      if (stats.isDirectory()) {
        result.push({ ...fileInfo, type: 'folder' });
        traverseDirectory(filePath, fileInfo.id);
      }
    });
  }

  traverseDirectory(directory, null);

  return result;
}

// const directory = '/home/evai/HOBBY/Useful';
// const filesAndTypes = getFiles(directory);
// console.log(filesAndTypes);

// Есть массив следующих файлов:
// {
//   id: string;
//   path: string;
//   type: string;
//   name: string;
//   extension: string | null;
//   size: string | null;
//   parentId: string | null;
// }
// Нужно его преобразовать в дерево со следующей структурой, вот пример:
// const treeData = [
//   {
//     title: 'parent 0',
//     key: '0-0',
//     children: [
//       { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
//       {
//         title: 'leaf 0-1',
//         key: '0-0-1',
//         isLeaf: false,
//         children: [{ title: 'leaf 0-0-0-0', key: '0-0-0-0', isLeaf: true }]
//       }
//     ]
//   },
//   {
//     title: 'parent 1',
//     key: '0-1',
//     children: [
//       { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
//       { title: 'leaf 1-1', key: '0-1-1', isLeaf: true }
//     ]
//   }
// ]

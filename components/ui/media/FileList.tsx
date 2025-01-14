import { FileType } from './MediaManager'
import { Folder, File } from 'lucide-react'

type FileListProps = {
  files: FileType[]
  onFolderClick: (folderId: string) => void
  onFileSelect: (fileId: string) => void
  selectedFiles: string[]
}

export default function FileList({ files, onFolderClick, onFileSelect, selectedFiles }: FileListProps) {
  return (
    <div className="space-y-2">
      {files.map(file => (
        <div 
          key={file.id} 
          className={`flex items-center p-2 border rounded cursor-pointer ${selectedFiles.includes(file.id) ? 'bg-blue-100' : ''}`}
          onClick={() => onFileSelect(file.id)}
          onDoubleClick={() => file.type === 'folder' && onFolderClick(file.id)}
        >
          {file.type === 'folder' ? (
            <Folder className="h-5 w-5 mr-2 text-yellow-500" />
          ) : (
            <File className="h-5 w-5 mr-2 text-gray-500" />
          )}
          <p className="truncate">{file.name}</p>
        </div>
      ))}
    </div>
  )
}


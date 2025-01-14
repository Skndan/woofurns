import { Grid } from 'lucide-react'
import { FileType } from './MediaManager'

type FileGridProps = {
  files: FileType[]
  onFolderClick: (folderId: string) => void
  onFileSelect: (fileId: string) => void
  selectedFiles: string[]
}

export default function FileGrid({ files, onFolderClick, onFileSelect, selectedFiles }: FileGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {files.map(file => (
        <div 
          key={file.id} 
          className={`p-2 border rounded cursor-pointer ${selectedFiles.includes(file.id) ? 'bg-blue-100' : ''}`}
          onClick={() => onFileSelect(file.id)}
          onDoubleClick={() => file.type === 'folder' && onFolderClick(file.id)}
        >
          {file.type === 'folder' ? (
            <Grid className="h-12 w-12 mx-auto text-yellow-500" />
          ) : (
            <div className="h-12 w-12 mx-auto bg-gray-200 flex items-center justify-center text-xs">
              {file.name.split('.').pop()?.toUpperCase()}
            </div>
          )}
          <p className="mt-2 text-center truncate">{file.name}</p>
        </div>
      ))}
    </div>
  )
}


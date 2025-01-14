'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Upload, Grid, List, ChevronLeft } from 'lucide-react'
import FileGrid from './FileGrid'
import FileList from './FileList'
import SearchBar from './SearchBar'
import SortDropdown from './SortDropdown'
import ViewToggle from './ViewToggle'

export type FileType = {
  id: string
  name: string
  type: 'file' | 'folder'
  url?: string
}

const initialFiles: FileType[] = [
  { id: '1', name: 'Documents', type: 'folder' },
  { id: '2', name: 'Images', type: 'folder' },
  { id: '3', name: 'file1.txt', type: 'file', url: '#' },
  { id: '4', name: 'file2.pdf', type: 'file', url: '#' },
]

export default function MediaManager() {
  const [isOpen, setIsOpen] = useState(false)
  const [files, setFiles] = useState<FileType[]>(initialFiles)
  const [currentFolder, setCurrentFolder] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'type'>('name')
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a[sortBy].localeCompare(b[sortBy]))

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder([...currentFolder, folderId])
  }

  const handleBackClick = () => {
    setCurrentFolder(currentFolder.slice(0, -1))
  }

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleRename = (fileId: string, newName: string) => {
    setFiles(files.map(file => 
      file.id === fileId ? { ...file, name: newName } : file
    ))
  }

  const handleDelete = (fileIds: string[]) => {
    setFiles(files.filter(file => !fileIds.includes(file.id)))
    setSelectedFiles([])
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Media Manager</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-full h-full flex flex-col p-0">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-bold">Media Manager</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Tabs defaultValue="select" className="flex-grow flex flex-col">
            <TabsList className="px-4 py-2 border-b">
              <TabsTrigger value="select">Select File</TabsTrigger>
              <TabsTrigger value="upload">Upload New</TabsTrigger>
            </TabsList>
            <TabsContent value="select" className="flex-grow flex flex-col p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  {currentFolder.length > 0 && (
                    <Button variant="ghost" size="icon" onClick={handleBackClick}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  )}
                  <SearchBar value={searchTerm} onChange={setSearchTerm} />
                </div>
                <div className="flex items-center space-x-2">
                  <SortDropdown value={sortBy} onChange={setSortBy} />
                  <ViewToggle value={viewType} onChange={setViewType} />
                </div>
              </div>
              {viewType === 'grid' ? (
                <FileGrid 
                  files={filteredFiles} 
                  onFolderClick={handleFolderClick}
                  onFileSelect={handleFileSelect}
                  selectedFiles={selectedFiles}
                />
              ) : (
                <FileList 
                  files={filteredFiles} 
                  onFolderClick={handleFolderClick}
                  onFileSelect={handleFileSelect}
                  selectedFiles={selectedFiles}
                />
              )}
              <div className="flex justify-between items-center mt-4">
                <div>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDelete(selectedFiles)}
                    disabled={selectedFiles.length === 0}
                  >
                    Delete Selected
                  </Button>
                </div>
                <Button disabled={selectedFiles.length !== 1}>Select</Button>
              </div>
            </TabsContent>
            <TabsContent value="upload" className="flex-grow p-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2">Drag and drop files here or click to upload</p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}


"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function ToolDetailsPage() {
  // Add state for tool details
  const [toolDetails] = useState({
    name: "getUserInfo", // This will come from drawer step 3
    description: "This tool is used to fetch user information from the database" // This will come from drawer step 3
  })

  // Add state for integration section
  const [isIntegrationOpen, setIsIntegrationOpen] = useState(false)

  // Add state for header rows
  const [headerRows, setHeaderRows] = useState<Array<{id: number, key: string, type: string, value: string}>>([])

  // Add function to handle new row
  const addHeaderRow = () => {
    setHeaderRows([...headerRows, {
      id: Date.now(),
      key: '',
      type: 'String',
      value: ''
    }])
  }

  // Add function to clear rows
  const clearHeaderRows = () => {
    setHeaderRows([])
  }

  // Add states for details section
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [showPropertyForm, setShowPropertyForm] = useState(false)
  const [properties, setProperties] = useState<Array<{
    id: number,
    name: string,
    description: string,
    type: string,
    isRequired: boolean,
    isExpanded: boolean
  }>>([])
  const [currentProperty, setCurrentProperty] = useState({
    name: '',
    description: '',
    type: 'string'
  })
  const [isAsyncTool, setIsAsyncTool] = useState(false)

  // Add function to handle property save
  const handleSaveProperty = () => {
    if (currentProperty.name && currentProperty.description) {
      const newProperty = {
        id: Date.now(),
        ...currentProperty,
        isRequired: false,
        isExpanded: false
      }
      setProperties([...properties, newProperty])
      setCurrentProperty({ name: '', description: '', type: 'string' })
      setShowPropertyForm(false)
    }
  }

  // Add function to handle copy
  const handleCopyId = () => {
    navigator.clipboard.writeText('719f67d0-b34d-46b3-a98d-1711149d7a41')
  }

  // Add state for delete warning
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)

  // Add function to handle delete
  const handleDelete = () => {
    // Close warning
    setShowDeleteWarning(false)
    // Redirect to tools page
    window.location.href = '/dashboard/tools'
  }

  // Add state for success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Add function to handle save
  const handleSave = () => {
    // Save logic here
    
    // Show success message
    setShowSuccessMessage(true)
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col overflow-hidden">
        {/* Sidebar Header */}
        <div className="p-4 border-b shrink-0">
          <div className="flex gap-2 mb-4">
            <Button variant="default" className="bg-black hover:bg-black/90 text-white">
              New Tool
            </Button>
            <Button variant="outline">Documentation</Button>
          </div>
          <input
            type="text"
            placeholder="Search all columns..."
            className="w-full p-2 border rounded-md text-sm"
          />
        </div>

        {/* Saved Tools List */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white border rounded-lg p-3 mb-2">
            <div className="text-gray-900 text-sm">{toolDetails.name}</div>
            <div className="text-gray-500 text-xs">{toolDetails.description}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold mb-1">{toolDetails.name}</h1>
              <div className="flex flex-col gap-1 text-sm text-gray-500">
                <button 
                  onClick={handleCopyId}
                  className="flex items-center gap-1 hover:text-gray-700 font-mono"
                >
                  <span>719f67d0-b34d-46b3-a98d-1711149d7a41</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
                <span>{toolDetails.description}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="text-red-500 hover:text-red-600"
                onClick={() => setShowDeleteWarning(true)}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </Button>
              <Button 
                variant="default" 
                className="bg-black hover:bg-black/90 text-white"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Integration Section */}
          <div className="mb-4">
            <button 
              onClick={() => setIsIntegrationOpen(!isIntegrationOpen)}
              className="w-full flex items-center justify-between p-4 bg-white border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                Integration
              </div>
              <svg 
                className={`w-5 h-5 transition-transform ${isIntegrationOpen ? 'rotate-180' : ''}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Integration Content */}
            {isIntegrationOpen && (
              <div className="mt-2 bg-white border rounded-lg p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Custom Tool</h3>
                  <p className="text-sm text-gray-500">Create a custom Function and connect it to any backend implementation.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Server URL</label>
                    <input 
                      type="text"
                      placeholder="Server Url for your Custom POST Endpoint"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Timeout Seconds</label>
                    <input 
                      type="number"
                      defaultValue={20}
                      className="w-full p-2 border rounded-md"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This is the timeout in seconds for the request to your server. Must be between 1 and 120 seconds.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Headers</label>
                    <p className="text-xs text-gray-500 mb-2">
                      These are the custom headers to include in the request sent to your server. Each key-value pair represents a header name and its value.
                    </p>

                    {/* Header Rows */}
                    {headerRows.length > 0 && (
                      <div className="mb-4 space-y-2">
                        {/* Table Headers */}
                        <div className="grid grid-cols-[1fr,100px,1fr,40px] gap-2 text-sm text-gray-500">
                          <div>Key</div>
                          <div>Type</div>
                          <div>Value</div>
                          <div></div>
                        </div>

                        {/* Rows */}
                        {headerRows.map((row) => (
                          <div key={row.id} className="grid grid-cols-[1fr,100px,1fr,40px] gap-2">
                            <input 
                              type="text"
                              placeholder="Key"
                              value={row.key}
                              onChange={(e) => {
                                setHeaderRows(headerRows.map(r => 
                                  r.id === row.id ? { ...r, key: e.target.value } : r
                                ))
                              }}
                              className="w-full p-2 border rounded-md text-sm"
                            />
                            <select 
                              value={row.type}
                              onChange={(e) => {
                                setHeaderRows(headerRows.map(r => 
                                  r.id === row.id ? { ...r, type: e.target.value } : r
                                ))
                              }}
                              className="w-full p-2 border rounded-md text-sm"
                            >
                              <option>String</option>
                              <option>Number</option>
                              <option>Boolean</option>
                            </select>
                            <input 
                              type="text"
                              placeholder="Value"
                              value={row.value}
                              onChange={(e) => {
                                setHeaderRows(headerRows.map(r => 
                                  r.id === row.id ? { ...r, value: e.target.value } : r
                                ))
                              }}
                              className="w-full p-2 border rounded-md text-sm"
                            />
                            <button 
                              onClick={() => {
                                setHeaderRows(headerRows.filter(r => r.id !== row.id))
                              }}
                              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={addHeaderRow}>
                        Add Row
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={clearHeaderRows}>
                          Clear
                        </Button>
                        <Button variant="default" size="sm" className="bg-black hover:bg-black/90 text-white">
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="mb-4">
            <button 
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className="w-full flex items-center justify-between p-4 bg-white border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Details
              </div>
              <svg 
                className={`w-5 h-5 transition-transform ${isDetailsOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Details Content */}
            {isDetailsOpen && (
              <div className="mt-2 bg-white border rounded-lg p-6">
                <div className="space-y-4">
                  {/* Tool Name and Description */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Tool Name</label>
                    <input 
                      type="text"
                      value={toolDetails.name}
                      disabled
                      className="w-full p-2 border rounded-md bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Tool Description</label>
                    <textarea 
                      value={toolDetails.description}
                      disabled
                      className="w-full p-2 border rounded-md bg-gray-50 h-24 resize-none"
                    />
                  </div>

                  {/* Async Tool Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Async Tool</h3>
                      <p className="text-xs text-gray-500">
                        This setting defines whether the assistant will move forward or wait for your server to respond. Enable this if you just want to trigger something on your server.
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsAsyncTool(!isAsyncTool)}
                      className={`w-11 h-6 rounded-full transition-colors ${isAsyncTool ? 'bg-black' : 'bg-gray-200'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${isAsyncTool ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  {/* Function Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Function</h3>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowPropertyForm(true)}
                      >
                        Add Property
                      </Button>
                    </div>

                    {/* Property Form - Always visible */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Property Name</label>
                          <input 
                            type="text"
                            value={currentProperty.name}
                            onChange={(e) => setCurrentProperty({...currentProperty, name: e.target.value})}
                            placeholder="Describe the property, its purpose, its use, etc."
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <textarea 
                            value={currentProperty.description}
                            onChange={(e) => setCurrentProperty({...currentProperty, description: e.target.value})}
                            placeholder="Property description..."
                            className="w-full p-2 border rounded-md h-24 resize-none"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="default"
                            size="sm"
                            className="bg-black hover:bg-black/90 text-white"
                            onClick={handleSaveProperty}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Properties List */}
                    {properties.map((property) => (
                      <div key={property.id} className="bg-gray-50 rounded-lg p-4 mb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{property.name}</span>
                            <span className="text-xs text-gray-500">{property.type}</span>
                            {property.isRequired && (
                              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">Required</span>
                            )}
                          </div>
                          <button 
                            onClick={() => {
                              setProperties(properties.map(p => 
                                p.id === property.id ? { ...p, isExpanded: !p.isExpanded } : p
                              ))
                            }}
                          >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        {property.isExpanded && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">{property.description}</p>
                            <div className="mt-2 flex justify-between">
                              <button
                                onClick={() => {
                                  setProperties(properties.map(p => 
                                    p.id === property.id ? { ...p, isRequired: !p.isRequired } : p
                                  ))
                                }}
                                className="text-sm text-gray-500 hover:text-gray-700"
                              >
                                {property.isRequired ? 'Make Optional' : 'Make Required'}
                              </button>
                              <button
                                onClick={() => {
                                  setProperties(properties.filter(p => p.id !== property.id))
                                }}
                                className="text-sm text-red-500 hover:text-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tool Messages Section */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Tool Messages</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Request Start Message</label>
                <input 
                  type="text"
                  placeholder="Message shown when the tool starts executing..."
                  className="w-full p-2 border rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Message shown when the tool starts executing. This message is never triggered for async tools. If not provided, a default message like "Hold on a sec" will be used.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Request Delayed Message</label>
                <input 
                  type="text"
                  placeholder="Message shown when the response is taking longer than expected..."
                  className="w-full p-2 border rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Message shown when the tool execution is taking longer than expected or when the user talks while processing. This message is never triggered for async tools.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Request Completed Message</label>
                <input 
                  type="text"
                  placeholder="Message shown when the tool completes successfully..."
                  className="w-full p-2 border rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Message shown when the tool completes successfully. For async tools, this is triggered immediately without waiting for server response. If not provided, the model will generate a response.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Request Failed Message</label>
                <input 
                  type="text"
                  placeholder="Message shown when the tool execution fails..."
                  className="w-full p-2 border rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Message shown when the tool execution fails. This message is never triggered for async tools. If not provided, the model will generate an error response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Warning Dialog */}
      {showDeleteWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Delete Tool</h3>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to delete this item? You can't undo this action afterwards.
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteWarning(false)}
                  className="w-24"
                >
                  Cancel
                </Button>
                <Button 
                  variant="default"
                  className="bg-red-500 hover:bg-red-600 text-white w-24"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-4 right-4 bg-green-50 text-green-600 px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg border border-green-100 animate-in slide-in-from-bottom duration-300">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>Tool saved successfully!</span>
        </div>
      )}
    </div>
  )
}
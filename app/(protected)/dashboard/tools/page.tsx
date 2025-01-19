"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { useState } from "react"

interface HeaderRow {
  id: number;
  key: string;
  type: string;
  value: string;
}

type Provider = 'custom' | 'make' | 'gohighlevel' | null;

interface Property {
  id: number;
  name: string;
  description: string;
  type: string;
  isRequired: boolean;
  isExpanded: boolean;
}

export default function ToolsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [headerRows, setHeaderRows] = useState<HeaderRow[]>([])
  const [selectedProvider, setSelectedProvider] = useState<Provider>('custom')
  const [isTypeOpen, setIsTypeOpen] = useState(false)
  const [selectedType, setSelectedType] = useState('string')
  const types = ['string', 'number', 'boolean']
  const [properties, setProperties] = useState<Property[]>([])
  const [currentProperty, setCurrentProperty] = useState({
    name: '',
    description: '',
    type: 'string'
  })
  const [showPropertyForm, setShowPropertyForm] = useState(true)
  const [isRequiredOpen, setIsRequiredOpen] = useState(false)

  const addNewRow = () => {
    const newRow = {
      id: Date.now(),
      key: '',
      type: 'String',
      value: ''
    }
    setHeaderRows(prev => [...prev, newRow])
  }

  const deleteRow = (id: number) => {
    setHeaderRows(prev => prev.filter(row => row.id !== id))
  }

  const getProviderMessage = () => {
    switch (selectedProvider) {
      case 'make':
        return "You haven't added Make Credentials. Please Copy paste the Webhook URL from your make.com scenario into the ServerURL."
      case 'gohighlevel':
        return "You haven't added GoHighLevel Credentials. Please Copy paste the Webhook URL from your GoHighLevel workflow into the ServerURL."
      default:
        return null
    }
  }

  const getServerUrlPlaceholder = () => {
    switch (selectedProvider) {
      case 'make':
        return "Webhook URL from your Make.com scenario"
      case 'gohighlevel':
        return "Webhook URL from your GoHighLevel workflow"
      default:
        return "Server Url for your Custom POST Endpoint"
    }
  }

  const handleNext = () => {
    if (step === 3) {
      setStep(4)
    } else if (step === 2) {
      setStep(3)
    } else {
      setStep(2)
    }
  }

  const handlePrevious = () => {
    if (step === 4) {
      setStep(3)
    } else if (step === 3) {
      setStep(2)
    } else if (step === 2) {
      setStep(1)
    }
  }

  const handleNewTool = () => {
    setSelectedProvider('custom')
    setStep(1)
    setIsOpen(true)
  }

  const handleSaveProperty = () => {
    if (currentProperty.name && currentProperty.description) {
      const newProperty = {
        id: Date.now(),
        ...currentProperty,
        isRequired: false,
        isExpanded: false,
        type: selectedType
      }
      setProperties([...properties, newProperty])
      setCurrentProperty({ name: '', description: '', type: 'string' })
      setShowPropertyForm(false)
    }
  }

  const toggleExpand = (id: number) => {
    setProperties(properties.map(p => 
      p.id === id ? { ...p, isExpanded: !p.isExpanded } : p
    ))
  }

  const toggleRequired = (id: number) => {
    setProperties(properties.map(p => 
      p.id === id ? { ...p, isRequired: !p.isRequired } : p
    ))
  }

  const handleCreate = () => {
    setIsOpen(false)
    setStep(1)
    setSelectedProvider('custom')
    setProperties([])
    setCurrentProperty({ name: '', description: '', type: 'string' })
    setHeaderRows([])
    
    window.location.href = '/dashboard/tools/details'
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[600px] sm:w-[540px] bg-white p-0 flex flex-col h-full">
          {/* Header */}
          <div className="border-b bg-gray-100 p-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <h2 className="text-xl font-semibold">Create a Tool</h2>
            </div>
          </div>

          {/* Scrollable content area */}
          <ScrollArea className="flex-1">
            {step === 1 ? (
              <div className="px-6 pt-2 pb-4">
                <h3 className="text-lg font-medium mb-2">Choose a provider</h3>
                <p className="text-gray-500 text-sm mb-3">Create a custom tool or choose from one of the supported providers.</p>
                
                {/* Progress Dots */}
                <div className="flex gap-1 mb-3">
                  <div className="w-8 h-1 bg-black rounded"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    onClick={() => setSelectedProvider('custom')}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedProvider === 'custom' 
                        ? 'bg-black text-white border-black' 
                        : 'hover:border-black'
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-2">
                        <svg className={`w-5 h-5 ${selectedProvider === 'custom' ? 'stroke-white' : 'stroke-black'}`} viewBox="0 0 24 24" fill="none" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                      </div>
                      <h4 className="font-medium mb-1">Custom Tool</h4>
                      <p className={`text-sm leading-snug ${selectedProvider === 'custom' ? 'text-gray-200' : 'text-gray-500'}`}>
                        Create a custom function and connect it to any backend implementation.
                      </p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedProvider('make')}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedProvider === 'make' 
                        ? 'bg-black text-white border-black' 
                        : 'hover:border-black'
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-2">
                        <span className="text-xl font-bold">/\/\</span>
                      </div>
                      <h4 className="font-medium mb-1">Make</h4>
                      <p className={`text-sm leading-snug ${selectedProvider === 'make' ? 'text-gray-200' : 'text-gray-500'}`}>
                        Connect your Make.com Scenario as a tool which can be triggered during conversations.
                      </p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedProvider('gohighlevel')}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedProvider === 'gohighlevel' 
                        ? 'bg-black text-white border-black' 
                        : 'hover:border-black'
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-2">
                        <span className="text-xl font-bold">HL</span>
                      </div>
                      <h4 className="font-medium mb-1">GoHighLevel</h4>
                      <p className={`text-sm leading-snug ${selectedProvider === 'gohighlevel' ? 'text-gray-200' : 'text-gray-500'}`}>
                        Connect your GoHighLevel Workflows as a tool, which can be triggered during conversations.
                      </p>
                    </div>
                  </div>
                </div>

                {selectedProvider && (
                  <div className="mt-6">
                    {/* Provider specific message */}
                    {getProviderMessage() && (
                      <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                        {getProviderMessage()}
                      </div>
                    )}

                    {/* Form Fields with gray background */}
                    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                      {selectedProvider !== 'custom' && (
                        <div>
                          <label className="block text-sm font-medium mb-1">Server URL</label>
                          <input 
                            type="text" 
                            placeholder={getServerUrlPlaceholder()}
                            className="w-full p-2 border rounded-md bg-white"
                          />
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              Clear
                            </Button>
                            <Button variant="default" size="sm" className="bg-black hover:bg-black/90 text-white">
                              Save
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Timeout and Headers sections - Only show for Custom Tool */}
                      {selectedProvider === 'custom' && (
                        <>
                          {/* Server URL Section */}
                          <div>
                            <label className="block text-sm font-medium mb-1">Server URL</label>
                            <input 
                              type="text"
                              placeholder="Server Url for your Custom POST Endpoint"
                              className="w-full p-2 border rounded-md bg-white"
                            />
                          </div>

                          {/* Timeout Section */}
                          <div>
                            <label className="block text-sm font-medium mb-1">Timeout Seconds</label>
                            <input 
                              type="number" 
                              defaultValue={20}
                              className="w-full p-2 border rounded-md bg-white"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              This is the timeout in seconds for the request to your server. Must be between 1 and 120 seconds.
                            </p>
                          </div>

                          {/* Headers Section with existing Clear and Save buttons */}
                          <div>
                            <label className="block text-sm font-medium mb-1">Headers</label>
                            <p className="text-xs text-gray-500 mb-2">
                              These are the custom headers to include in the request sent to your server. Each key-value pair represents a header name and its value.
                            </p>
                            
                            {/* Only show table when there are rows */}
                            {headerRows.length > 0 && (
                              <div className="mb-3 space-y-2">
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
                                        setHeaderRows(prev => 
                                          prev.map(r => r.id === row.id ? { ...r, key: e.target.value } : r)
                                        )
                                      }}
                                      className="w-full p-2 border rounded-md text-sm bg-white"
                                    />
                                    <select 
                                      value={row.type}
                                      onChange={(e) => {
                                        setHeaderRows(prev => 
                                          prev.map(r => r.id === row.id ? { ...r, type: e.target.value } : r)
                                        )
                                      }}
                                      className="w-full p-2 border rounded-md text-sm bg-white"
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
                                        setHeaderRows(prev => 
                                          prev.map(r => r.id === row.id ? { ...r, value: e.target.value } : r)
                                        )
                                      }}
                                      className="w-full p-2 border rounded-md text-sm bg-white"
                                    />
                                    <button 
                                      onClick={() => deleteRow(row.id)}
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

                            <div className="flex justify-between gap-4">
                              <Button variant="outline" size="sm" className="w-24" onClick={addNewRow}>
                                Add Row
                              </Button>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => setHeaderRows([])}>
                                  Clear
                                </Button>
                                <Button variant="default" size="sm" className="bg-black hover:bg-black/90 text-white">
                                  Save
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : step === 3 ? (
              <div className="px-6 py-4">
                <h3 className="text-lg font-medium mb-2">What is this tool for?</h3>
                <p className="text-gray-500 text-sm mb-4">Add Details to your tool which will be used by the LLM to understand and call the tool.</p>

                {/* Progress Dots */}
                <div className="flex gap-1 mb-4">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-8 h-1 bg-black rounded"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      type="text"
                      placeholder="What is your tool name? (e.g. getUserInfo, getUserEmail, lookupAddress...)"
                      className="w-full p-2 border rounded-md bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea 
                      placeholder="Describe the Tool, its purpose, its use, etc."
                      className="w-full p-2 border rounded-md bg-white h-24 resize-none"
                    />
                  </div>
                </div>
              </div>
            ) : step === 2 ? (
              <div className="px-6 py-4">
                <h3 className="text-lg font-medium mb-2">Build your Schema</h3>
                <p className="text-gray-500 text-sm mb-4">Define your schema which the LLM should generate.</p>

                {/* Properties Button */}
                <button 
                  onClick={() => setShowPropertyForm(!showPropertyForm)}
                  className="flex items-center gap-2 text-sm font-medium mb-4 bg-gray-100 px-3 py-2 rounded-md"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                  Properties
                </button>

                {/* Property Form - Only show when button is clicked */}
                {showPropertyForm && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Property Name</label>
                        <input 
                          type="text"
                          value={currentProperty.name}
                          onChange={(e) => setCurrentProperty({...currentProperty, name: e.target.value})}
                          className="w-full p-2 border rounded-md bg-white"
                          placeholder="Property Name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <input 
                          type="text"
                          value={currentProperty.description}
                          onChange={(e) => setCurrentProperty({...currentProperty, description: e.target.value})}
                          className="w-full p-2 border rounded-md bg-white"
                          placeholder="Describe the property, its purpose, its use, etc."
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="relative">
                          <button 
                            onClick={() => setIsTypeOpen(!isTypeOpen)}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md hover:border-black"
                          >
                            <span>{selectedType}</span>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {isTypeOpen && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-md shadow-lg">
                              {types.map(type => (
                                <button
                                  key={type}
                                  onClick={() => {
                                    setSelectedType(type);
                                    setIsTypeOpen(false);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Buttons with reduced gap */}
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => {
                              setCurrentProperty({ name: '', description: '', type: 'string' });
                              setSelectedType('string');
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            Delete
                          </Button>

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
                  </div>
                )}

                {/* Show saved properties and required section always */}
                {properties.length > 0 && (
                  <>
                    {/* Saved Properties List */}
                    <div className="space-y-2 mb-4">
                      {properties.map(property => (
                        <div key={property.id} className="bg-white border rounded-lg">
                          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                               onClick={() => toggleExpand(property.id)}>
                            <div className="flex items-center gap-2">
                              <svg 
                                className={`w-4 h-4 transition-transform ${property.isExpanded ? 'rotate-90' : ''}`}
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2"
                              >
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                              <input
                                type="text"
                                value={property.name}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  setProperties(properties.map(p => 
                                    p.id === property.id ? { ...p, name: e.target.value } : p
                                  ));
                                }}
                                className="font-medium bg-transparent border-none focus:outline-none"
                                onClick={e => e.stopPropagation()}
                              />
                            </div>
                            <div className="flex items-center gap-3">
                              {/* Type Selection */}
                              <select
                                value={property.type}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  setProperties(properties.map(p => 
                                    p.id === property.id ? { ...p, type: e.target.value } : p
                                  ));
                                }}
                                className="text-sm text-gray-500 bg-transparent border-none focus:outline-none cursor-pointer"
                                onClick={e => e.stopPropagation()}
                              >
                                {types.map(type => (
                                  <option key={type} value={type}>{type}</option>
                                ))}
                              </select>

                              {/* Delete Button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setProperties(properties.filter(p => p.id !== property.id));
                                }}
                                className="text-red-500 hover:text-red-600"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {property.isExpanded && (
                            <div className="px-3 py-2 border-t bg-gray-50">
                              <input
                                type="text"
                                value={property.description}
                                onChange={(e) => {
                                  setProperties(properties.map(p => 
                                    p.id === property.id ? { ...p, description: e.target.value } : p
                                  ));
                                }}
                                className="text-sm text-gray-600 w-full bg-transparent border-none focus:outline-none"
                                placeholder="Enter description..."
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Required Section */}
                    <div className="mb-4">
                      <button 
                        onClick={() => setIsRequiredOpen(!isRequiredOpen)}
                        className="flex items-center gap-2 w-full text-sm font-medium p-3 bg-white border rounded-lg hover:bg-gray-50"
                      >
                        <svg 
                          className={`w-4 h-4 transition-transform ${isRequiredOpen ? 'rotate-90' : ''}`}
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                        <span>Required</span>
                      </button>

                      {/* Required Properties List */}
                      {isRequiredOpen && (
                        <div className="mt-2 space-y-2 pl-4">
                          {/* Show all properties in Required section */}
                          {properties.map(property => (
                            <div key={property.id} className="p-2 bg-white border rounded-lg">
                              <span className="text-sm">{property.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : step === 4 ? (
              <div className="px-6 py-4">
                <h3 className="text-lg font-medium mb-2">What messages should be shown to the user as the tool is running?</h3>
                <p className="text-gray-500 text-sm mb-4">Configure the messages that should be shown to the user as the tool is running.</p>

                {/* Progress Dots */}
                <div className="flex gap-1 mb-4">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-8 h-1 bg-black rounded"></div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Message</label>
                    <input 
                      type="text"
                      placeholder="Message to show when the tool starts running (e.g. 'Fetching user information...')"
                      className="w-full p-2 border rounded-md bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Delayed Response Message</label>
                    <input 
                      type="text"
                      placeholder="Message to show when the response is taking longer than expected"
                      className="w-full p-2 border rounded-md bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Success Message</label>
                    <input 
                      type="text"
                      placeholder="Message to show when the tool completes successfully"
                      className="w-full p-2 border rounded-md bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Error Message</label>
                    <input 
                      type="text"
                      placeholder="Message to show if the tool execution fails"
                      className="w-full p-2 border rounded-md bg-white"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-6 pt-2 pb-4">
                <h3 className="text-lg font-medium mb-2">Choose a provider</h3>
                <p className="text-gray-500 text-sm mb-3">Create a custom tool or choose from one of the supported providers.</p>
                
                {/* Progress Dots */}
                <div className="flex gap-1 mb-3">
                  <div className="w-8 h-1 bg-black rounded"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    onClick={() => setSelectedProvider('custom')}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedProvider === 'custom' 
                        ? 'bg-black text-white border-black' 
                        : 'hover:border-black'
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-2">
                        <svg className={`w-5 h-5 ${selectedProvider === 'custom' ? 'stroke-white' : 'stroke-black'}`} viewBox="0 0 24 24" fill="none" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                      </div>
                      <h4 className="font-medium mb-1">Custom Tool</h4>
                      <p className={`text-sm leading-snug ${selectedProvider === 'custom' ? 'text-gray-200' : 'text-gray-500'}`}>
                        Create a custom function and connect it to any backend implementation.
                      </p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedProvider('make')}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedProvider === 'make' 
                        ? 'bg-black text-white border-black' 
                        : 'hover:border-black'
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-2">
                        <span className="text-xl font-bold">/\/\</span>
                      </div>
                      <h4 className="font-medium mb-1">Make</h4>
                      <p className={`text-sm leading-snug ${selectedProvider === 'make' ? 'text-gray-200' : 'text-gray-500'}`}>
                        Connect your Make.com Scenario as a tool which can be triggered during conversations.
                      </p>
                    </div>
                  </div>

                  <div 
                    onClick={() => setSelectedProvider('gohighlevel')}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedProvider === 'gohighlevel' 
                        ? 'bg-black text-white border-black' 
                        : 'hover:border-black'
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-2">
                        <span className="text-xl font-bold">HL</span>
                      </div>
                      <h4 className="font-medium mb-1">GoHighLevel</h4>
                      <p className={`text-sm leading-snug ${selectedProvider === 'gohighlevel' ? 'text-gray-200' : 'text-gray-500'}`}>
                        Connect your GoHighLevel Workflows as a tool, which can be triggered during conversations.
                      </p>
                    </div>
                  </div>
                </div>

                {selectedProvider && (
                  <div className="mt-6">
                    {/* Provider specific message */}
                    {getProviderMessage() && (
                      <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
                        {getProviderMessage()}
                      </div>
                    )}

                    {/* Form Fields with gray background */}
                    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                      {selectedProvider !== 'custom' && (
                        <div>
                          <label className="block text-sm font-medium mb-1">Server URL</label>
                          <input 
                            type="text" 
                            placeholder={getServerUrlPlaceholder()}
                            className="w-full p-2 border rounded-md bg-white"
                          />
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              Clear
                            </Button>
                            <Button variant="default" size="sm" className="bg-black hover:bg-black/90 text-white">
                              Save
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Timeout and Headers sections - Only show for Custom Tool */}
                      {selectedProvider === 'custom' && (
                        <>
                          {/* Server URL Section */}
                          <div>
                            <label className="block text-sm font-medium mb-1">Server URL</label>
                            <input 
                              type="text"
                              placeholder="Server Url for your Custom POST Endpoint"
                              className="w-full p-2 border rounded-md bg-white"
                            />
                          </div>

                          {/* Timeout Section */}
                          <div>
                            <label className="block text-sm font-medium mb-1">Timeout Seconds</label>
                            <input 
                              type="number" 
                              defaultValue={20}
                              className="w-full p-2 border rounded-md bg-white"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              This is the timeout in seconds for the request to your server. Must be between 1 and 120 seconds.
                            </p>
                          </div>

                          {/* Headers Section with existing Clear and Save buttons */}
                          <div>
                            <label className="block text-sm font-medium mb-1">Headers</label>
                            <p className="text-xs text-gray-500 mb-2">
                              These are the custom headers to include in the request sent to your server. Each key-value pair represents a header name and its value.
                            </p>
                            
                            {/* Only show table when there are rows */}
                            {headerRows.length > 0 && (
                              <div className="mb-3 space-y-2">
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
                                        setHeaderRows(prev => 
                                          prev.map(r => r.id === row.id ? { ...r, key: e.target.value } : r)
                                        )
                                      }}
                                      className="w-full p-2 border rounded-md text-sm bg-white"
                                    />
                                    <select 
                                      value={row.type}
                                      onChange={(e) => {
                                        setHeaderRows(prev => 
                                          prev.map(r => r.id === row.id ? { ...r, type: e.target.value } : r)
                                        )
                                      }}
                                      className="w-full p-2 border rounded-md text-sm bg-white"
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
                                        setHeaderRows(prev => 
                                          prev.map(r => r.id === row.id ? { ...r, value: e.target.value } : r)
                                        )
                                      }}
                                      className="w-full p-2 border rounded-md text-sm bg-white"
                                    />
                                    <button 
                                      onClick={() => deleteRow(row.id)}
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

                            <div className="flex justify-between gap-4">
                              <Button variant="outline" size="sm" className="w-24" onClick={addNewRow}>
                                Add Row
                              </Button>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => setHeaderRows([])}>
                                  Clear
                                </Button>
                                <Button variant="default" size="sm" className="bg-black hover:bg-black/90 text-white">
                                  Save
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          <div className="mt-auto border-t bg-gray-100">
            <div className="p-4 flex justify-between items-center">
              <div>
                <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={step === 1}
                  onClick={handlePrevious}
                  className={step === 1 ? "text-gray-400" : ""}
                >
                  Previous
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-black hover:bg-black/90 text-white"
                  onClick={step === 4 ? handleCreate : handleNext}
                >
                  {step === 4 ? 'Create' : 'Next'}
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main page content */}
      <div className="flex flex-col items-center justify-center min-h-[600px] max-w-4xl mx-auto text-center">
        {/* Gray background container for all content */}
        <div className="bg-gray-50 p-8 rounded-lg border w-full max-w-2xl">
          <div className="mb-8">
            {/* Tools Icon */}
            <div className="flex justify-center mb-6">
              <svg 
                className="w-20 h-20 text-black" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-2">Tools</h1>
            <p className="text-gray-500 mb-4">
              Tools are functions you make that can be utilized by your assistants in calls.
            </p>
            <p className="text-gray-500 mb-8">
              You can connect external automation tools like Make, GoHighLevel, or create custom tools for assistants to use.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="default" 
                className="bg-black hover:bg-black/90 text-white"
                onClick={handleNewTool}
              >
                New Tool
              </Button>
              <Link href="/documentation">
                <Button variant="outline">Documentation</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 
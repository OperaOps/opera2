"use client"

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { UploadFile, ExtractDataFromUploadedFile } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Database, 
  CheckCircle,
  AlertCircle,
  Loader2,
  X
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export default function DataInput() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDataType, setSelectedDataType] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUpload = useCallback(async (files) => {
    if (!files.length || !selectedDataType) return;

    setIsUploading(true);
    const newFiles = Array.from(files).map(file => ({
      file_name: file.name,
      data_type: selectedDataType,
      processing_status: 'processing',
      id: Date.now() + Math.random() // Temp ID
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);

    for (const file of files) {
      try {
        setUploadProgress(20);
        const { file_url } = await UploadFile({ file });
        
        setUploadProgress(40);
        const uploadRecord = {
          id: Date.now() + Math.random(),
          file_name: file.name,
          file_url,
          file_type: file.name.split('.').pop().toLowerCase(),
          data_type: selectedDataType,
          processing_status: 'processing'
        };

        setUploadProgress(60);
        let schema = {}; // Demo schema

        if (selectedDataType === 'appointments') {
            schema = {
              type: "object",
              properties: {
                id: { type: "string" },
                patient_id: { type: "string" },
                date: { type: "string" },
                time: { type: "string" },
                appointment_type: { type: "string" },
                status: { type: "string" }
              }
            };
        } else if (selectedDataType === 'financial') {
            schema = {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                value: { type: "number" },
                unit: { type: "string" },
                timestamp: { type: "string" }
              }
            };
        }

        const extractResult = await ExtractDataFromUploadedFile({
          file_url,
          json_schema: schema
        });

        setUploadProgress(80);

        if (extractResult.status === 'success' && extractResult.output) {
          const dataArray = Array.isArray(extractResult.output) ? extractResult.output : [extractResult.output];
          
          // Update upload record
          const completedRecord = {
            ...uploadRecord,
            processed: true,
            processing_status: 'completed',
            records_count: dataArray.length
          };

          setUploadedFiles(prev => prev.map(f => f.file_name === file.name ? completedRecord : f));
        } else {
          throw new Error(extractResult.details || 'Failed to extract data');
        }
        setUploadProgress(100);
      } catch (error) {
        console.error('Error processing file:', error);
        setUploadedFiles(prev => prev.map(f => f.file_name === file.name ? { ...f, processing_status: 'error' } : f));
      }
    }

    setIsUploading(false);
  }, [selectedDataType]);

  const handleFileSelect = (event) => {
    handleFileUpload(event.target.files);
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    handleFileUpload(event.dataTransfer.files);
  }, [handleFileUpload]);

  const removeFile = (fileName) => {
    setUploadedFiles(prev => prev.filter(f => f.file_name !== fileName));
  };


  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-4xl font-extralight text-white tracking-wide">Data Input</h1>
        <p className="text-base text-gray-400 font-light">
          Upload and process your clinic data to update live metrics
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          variants={itemVariants}
          className="fluid-surface rounded-[2rem] p-8 space-y-6"
        >
          <div>
            <label className="text-base font-light text-gray-300 mb-3 block">1. Select Data Type</label>
            <Select value={selectedDataType} onValueChange={setSelectedDataType}>
              <SelectTrigger className="w-full bg-black/20 border-white/10 rounded-xl h-12 text-sm">
                <SelectValue placeholder="Choose the type of data you're uploading..." />
              </SelectTrigger>
              <SelectContent className="bg-black/80 backdrop-blur-lg border-white/10 text-white">
                <SelectItem value="appointments">Appointments Data</SelectItem>
                <SelectItem value="financial">Financial Metrics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-base font-light text-gray-300 mb-3 block">2. Upload File</label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 flex flex-col items-center justify-center space-y-4 h-56 ${
                selectedDataType
                  ? 'border-purple-500/50 hover:border-purple-400/70 hover:bg-purple-600/5'
                  : 'border-gray-600/50 cursor-not-allowed opacity-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".csv,.xlsx,.pdf"
                onChange={handleFileSelect}
                className="hidden"
                disabled={!selectedDataType}
              />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/10 to-blue-600/10 flex items-center justify-center">
                <Upload className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-200">
                {selectedDataType ? 'Drop files here or click to browse' : 'Select data type first'}
              </h3>
              <p className="text-gray-400 text-xs">Supported: CSV, Excel, PDF</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="fluid-surface rounded-[2rem] p-8 space-y-4"
        >
          <h3 className="text-2xl font-light text-gray-200">Processing Status</h3>
          {isUploading && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <h3 className="font-semibold text-gray-200">Processing Files...</h3>
                <span className="text-purple-400 font-medium">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-1.5 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-blue-500" />
            </div>
          )}
          <div className="space-y-3 max-h-[20rem] overflow-y-auto pr-2">
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((file, index) => (
                <motion.div
                  key={file.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-black/20"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-200 text-sm truncate max-w-[200px]">{file.file_name}</h4>
                      <p className="text-xs text-gray-400 capitalize">
                        {file.data_type?.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {file.processing_status === 'completed' && (
                      <div className="flex items-center space-x-1.5 text-green-400 text-xs">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{file.records_count} records</span>
                      </div>
                    )}
                    {file.processing_status === 'error' && (
                      <div className="flex items-center space-x-1.5 text-red-400 text-xs">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Failed</span>
                      </div>
                    )}
                    {file.processing_status === 'processing' && (
                       <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                    )}
                    <Button variant="ghost" size="icon" onClick={() => removeFile(file.file_name)} className="text-gray-500 hover:text-red-400 w-6 h-6">
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Database className="w-10 h-10 mx-auto text-gray-600" />
                <p className="mt-4 text-gray-500 text-sm">Uploaded files will appear here</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
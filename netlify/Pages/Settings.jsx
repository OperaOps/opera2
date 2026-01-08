"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "../Entities/User";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Key, Database, Save, CheckCircle, Loader2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};


export default function Settings() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    claude_api_key: '',
    greyfinch_api_key: '',
    clinic_name: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      setFormData({
        claude_api_key: userData.claude_api_key || '',
        greyfinch_api_key: userData.greyfinch_api_key || '',
        clinic_name: userData.clinic_name || ''
      });
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await User.updateMyUserData(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const InputField = ({ id, label, value, onChange, placeholder, type = "text", description }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-gray-300 font-light text-base">{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-black/20 text-gray-200 rounded-xl h-12 border-white/10 focus:border-purple-500/50 transition-all duration-300"
      />
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto space-y-10">
      <motion.div
        variants={itemVariants}
        className="space-y-2"
      >
        <h1 className="text-4xl font-extralight text-white tracking-wide">Settings</h1>
        <p className="text-base text-gray-400 font-light">
          Configure your Opera AI dashboard and integrations
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="fluid-surface rounded-[2rem] p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-light text-gray-200 flex items-center space-x-3"><Key className="w-5 h-5 text-purple-400" /><span>API Configuration</span></h3>
            <InputField
              id="claude_api_key"
              label="Claude API Key"
              type="password"
              value={formData.claude_api_key}
              onChange={(val) => handleInputChange('claude_api_key', val)}
              placeholder="sk-ant-..."
              description="For AI-powered insights and natural language queries."
            />
            <InputField
              id="greyfinch_api_key"
              label="Greyfinch API Key"
              type="password"
              value={formData.greyfinch_api_key}
              onChange={(val) => handleInputChange('greyfinch_api_key', val)}
              placeholder="gf_..."
              description="For connecting to your data warehouse for live metrics."
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-light text-gray-200 flex items-center space-x-3"><Database className="w-5 h-5 text-blue-400" /><span>Clinic Information</span></h3>
            <InputField
              id="clinic_name"
              label="Clinic Name"
              value={formData.clinic_name}
              onChange={(val) => handleInputChange('clinic_name', val)}
              placeholder="Enter your clinic's name"
              description="Used for personalizing your dashboard experience."
            />
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSave}
            disabled={isSaving || saveSuccess}
            className={`rounded-xl px-6 py-3 text-sm transition-all duration-300 w-40 h-12
              ${saveSuccess 
                ? 'bg-green-600' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
            }`}
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : saveSuccess ? (
              <motion.div initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}} className="flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Saved</motion.div>
            ) : (
              <span className="flex items-center"><Save className="w-4 h-4 mr-2" /> Save</span>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
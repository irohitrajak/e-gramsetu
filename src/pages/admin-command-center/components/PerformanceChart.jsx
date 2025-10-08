import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

import Button from '../../../components/ui/Button';

const PerformanceChart = () => {
  const [chartType, setChartType] = useState('applications');
  const [timeRange, setTimeRange] = useState('7days');

  const applicationData = [
    { name: 'सोम', applications: 45, approved: 32, rejected: 8, pending: 5 },
    { name: 'मंगल', applications: 52, approved: 38, rejected: 10, pending: 4 },
    { name: 'बुध', applications: 38, approved: 28, rejected: 6, pending: 4 },
    { name: 'गुरु', applications: 61, approved: 45, rejected: 12, pending: 4 },
    { name: 'शुक्र', applications: 48, approved: 35, rejected: 9, pending: 4 },
    { name: 'शनि', applications: 35, approved: 25, rejected: 7, pending: 3 },
    { name: 'रवि', applications: 42, approved: 30, rejected: 8, pending: 4 }
  ];

  const jobData = [
    { name: 'सोम', posted: 12, filled: 8, expired: 2 },
    { name: 'मंगल', posted: 15, filled: 11, expired: 1 },
    { name: 'बुध', posted: 9, filled: 6, expired: 2 },
    { name: 'गुरु', posted: 18, filled: 13, expired: 3 },
    { name: 'शुक्र', posted: 14, filled: 10, expired: 2 },
    { name: 'शनि', posted: 8, filled: 5, expired: 1 },
    { name: 'रवि', posted: 11, filled: 7, expired: 2 }
  ];

  const schemeData = [
    { name: 'कृषि योजनाएं', value: 35, color: '#22C55E' },
    { name: 'रोजगार योजनाएं', value: 28, color: '#3B82F6' },
    { name: 'शिक्षा योजनाएं', value: 20, color: '#F59E0B' },
    { name: 'स्वास्थ्य योजनाएं', value: 17, color: '#EF4444' }
  ];

  const getChartData = () => {
    switch (chartType) {
      case 'applications':
        return applicationData;
      case 'jobs':
        return jobData;
      default:
        return applicationData;
    }
  };

  const renderChart = () => {
    if (chartType === 'schemes') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={schemeData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {schemeData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [`${value}%`, name]}
              labelStyle={{ color: '#1F2937' }}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'applications') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="approved" fill="#22C55E" name="स्वीकृत" />
            <Bar dataKey="pending" fill="#F59E0B" name="लंबित" />
            <Bar dataKey="rejected" fill="#EF4444" name="अस्वीकृत" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Line type="monotone" dataKey="posted" stroke="#3B82F6" strokeWidth={2} name="पोस्ट की गई" />
          <Line type="monotone" dataKey="filled" stroke="#22C55E" strokeWidth={2} name="भरी गई" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            प्रदर्शन विश्लेषण
          </h3>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e?.target?.value)}
              className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="7days">पिछले 7 दिन</option>
              <option value="30days">पिछले 30 दिन</option>
              <option value="90days">पिछले 90 दिन</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={chartType === 'applications' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('applications')}
          >
            आवेदन
          </Button>
          <Button
            variant={chartType === 'jobs' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('jobs')}
          >
            नौकरियां
          </Button>
          <Button
            variant={chartType === 'schemes' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('schemes')}
          >
            योजनाएं
          </Button>
        </div>
      </div>
      <div className="p-6">
        {renderChart()}
        
        {chartType === 'schemes' && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {schemeData?.map((scheme, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: scheme?.color }}
                ></div>
                <span className="text-sm text-foreground">{scheme?.name}</span>
                <span className="text-sm font-medium text-muted-foreground">{scheme?.value}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceChart;
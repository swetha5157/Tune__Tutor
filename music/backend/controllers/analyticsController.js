const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/orderModel');


exports.getAnalyticsDaily=async(req,res)=>{
    try {
        const dailyOrders = await Order.aggregate([
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderedDate" } }, // Group by day
                count: { $sum: 1 } // Count the number of orders per day
              }
            },
            {
              $sort: { _id: 1 }
            },
            {
              $project: {
                _id: 1,
                count: 1
              }
            }
          ]);
          
          // Generate the full range of dates you want to display
          const startDate = new Date('2024-08-01');
          const endDate = new Date();
          const allDates = [];
          for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            allDates.push(d.toISOString().split('T')[0]);
          }
          
          // Fill missing dates with zero orders
          const dailyOrderMap = dailyOrders.reduce((map, item) => {
            map[item._id] = item.count;
            return map;
          }, {});
          
          const completeDailyOrders = allDates.map(date => ({
            _id: date,
            count: dailyOrderMap[date] || 0
          }));
          
          res.json(completeDailyOrders);
          
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

exports.getWeekly=async(req,res)=>{
    try {
        const weeklyOrders = await Order.aggregate([
          {
            $group: {
              _id: {
                week: { $isoWeek: "$orderedDate" }, // ISO week number
                year: { $isoWeekYear: "$orderedDate" } // ISO year
              },
              count: { $sum: 1 } // Count the number of orders per week
            }
          },
          {
            $sort: { "_id.year": 1, "_id.week": 1 } // Sort by year and week ascending
          }
        ]);
    
        res.json(weeklyOrders);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
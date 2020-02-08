/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import Module from '../util/Module';
import { Router, Route } from 'react-router-dom';
import MainBox from '../components/MainBox';
import history from '../history';
import { redirect } from '../util/Util';
import { OrderMeal as OrderMealModel } from '../models/OrderMeal';

const mockMeal: OrderMealModel[] = [
    {
      order_id: 456,
      table_id: 1,
    }
  ];


import React from 'react';
import {
	FaHome,
	FaUserFriends,
	FaCalendarAlt,
	FaUserTie
} from 'react-icons/fa';
import {AiFillDashboard } from 'react-icons/ai';
import {GrServices} from 'react-icons/gr';
import {HiShoppingBag} from 'react-icons/hi';

export const links = [
		

	{
		id: 1,
		url: '/',
		text: 'home',
		icon: <FaHome className="w-5 h-5" />,
	},

	
	{
		id: 3,
		url: '/experts',
		text: 'Experts',
		icon: <FaUserFriends className="w-5 h-5" />,
	},
	{
		id: 4,
		url: '/services',
		text: 'Services',
		icon: <GrServices className="w-5 h-5" />,
	},
	{
		id: 2,
		url: '/meet',
		text: 'My Meets',
		icon: <FaCalendarAlt className="w-5 h-5" />,
	},
	{
		id: 5,
		url: '/orders',
		text: 'My Orders',
		icon: <HiShoppingBag className="w-5 h-5" />,
	},


];

export const ProtectedlinksUser = [
	
	
	
	{
		id: 1,
		url: '/apply', 
		text: 'Apply',
		icon: <FaUserTie className="w-5 h-5" />,
		
	},
	{
		id: 2,
		url: '/',
		text: 'home',
		icon: <FaHome className="w-5 h-5" />,
	},
	
	
	{
		id: 4,
		url: '/experts',
		text: 'Experts',
		icon: <FaUserFriends className="w-5 h-5" />,
	},
	{
		id: 5,
		url: '/services',
		text: 'Services',
		icon: <GrServices className="w-5 h-5" />,
	},
	{
		id: 3,
		url: '/meet',
		text: 'My Meets',
		icon: <FaCalendarAlt className="w-5 h-5" />,
	},
	{
		id: 6,
		url: '/orders',
		text: 'My Orders',
		icon: <HiShoppingBag className="w-5 h-5" />,
	},


];

export const ProtectedlinksExpert = [
	
		
	{
		id: 1,
		url: '/dashboard',
		text: 'Dashboard',
		icon: <AiFillDashboard className="w-5 h-5" />,
	},	
	
	
	{
		id: 2,
		url: '/',
		text: 'home',
		icon: <FaHome className="w-5 h-5" />,
	},
	
	
	{
		id: 4,
		url: '/experts',
		text: 'Experts',
		icon: <FaUserFriends className="w-5 h-5" />,
	},
	{
		id: 5,
		url: '/services',
		text: 'Services',
		icon: <GrServices className="w-5 h-5" />,
	},
	{
		id: 3,
		url: '/meet',
		text: 'My Meets',
		icon: <FaCalendarAlt className="w-5 h-5" />,
	},
	{
		id: 6,
		url: '/orders',
		text: 'My Orders',
		icon: <HiShoppingBag className="w-5 h-5" />,
	},


];


'use strict';

var puzzles = [

	{
		fen1: "4kq2/3p4/4B1P1/B7/8/8/8/4R2K",
		fen2: "4kq2/3p1B2/6P1/B7/8/8/8/4R2K"
	},
	{
		fen1: "8/5B2/4p3/4kp2/3Np3/8/4P3/Q2R2K1",
		fen2: "8/5B2/4N3/4kp2/4p3/8/4P3/Q2R2K1"
	},	
	{
		fen1: "5rk1/8/7P/6N1/8/8/1B6/2K5",
		fen2: "5rk1/7P/8/6N1/8/8/1B6/2K5"
	},	
	{
		fen1: "3bk3/R3p3/3P4/8/8/8/8/4KR2",
		fen2: "3bk3/R2Pp3/8/8/8/8/8/4KR2"
	},	
	{
		fen1: "6rk/6n1/5R2/8/8/8/8/6K1",
		fen2: "6rk/6n1/8/8/8/8/8/6K1"
	},	
	{
		fen1: "1rkr2R1/1pnb4/8/8/3Q4/8/8/3R2K1",
		fen2: "1rkr2R1/1pnQ4/8/8/8/8/8/3R2K1"
	},	
	{
		fen1: "5k2/4np2/8/2B5/8/8/8/6RK",
		fen2: "5kR1/4np2/8/2B5/8/8/8/7K"
	},	
	{
		fen1: "3qkn2/1R6/4N3/8/8/8/8/5K2",
		fen2: "3qkn2/1R4N1/8/8/8/8/8/5K2"
	},	
	{
		fen1: "4b3/3k4/4q3/B7/8/6Q1/8/6K1",
		fen2: "4b3/2Qk4/4q3/B7/8/8/8/6K1"
	},	
	{
		fen1: "4k3/3nn3/4N3/1N6/3K4/8/8/8",
		fen2: "4k3/3nn3/3NN3/8/3K4/8/8/8"
	}

];

//return a random puzzle object from puzzles array
function getFen() {
	return puzzles[Math.floor(Math.random()*9)];
};
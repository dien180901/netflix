import React from "react";

require("./style.scss");

const SliderItem = ({ movie, width }) => {
	return (
		<div
			className="slider-item"
			// style={{ width: `${width}px` }}
		>
			<div
				className="item item-1 "
				style={{
					backgroundImage: `url(
						http://image.tmdb.org/t/p/w780${movie.backdrop_path}
					)`,
				}}
			>
				{/* <img
					classNameName="slider-image"
					src={`http://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
					alt={movie.title}
				/> */}
				<div className="body-item">
					<div className="body-item-1">
						<div className="play">
							<i className="icon-play"></i>
						</div>
					</div>
					<div className="title body-item-2">Breaking Bad</div>
					<div className="properties body-item-3">
						<span className="match">% 98 Match</span>
						<span className="year">2012</span>
						<span className="age-limit">13+</span>
						<span className="time">2h 13m</span>
					</div>
					<p className="description body-item-4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius alias
						libero..
					</p>
					<div className="body-item-5">
						<i className="details-icon icon-chevron-down"></i>
					</div>
					<div className="icon-set body-item-6">
						<i className="icon-thumbs-up"></i>
						<i className="icon-thumbs-down"></i>
						<i className="icon-plus"></i>
					</div>
				</div>
			</div>
		</div>
		// <div className="item item-1">
		// 	<div className="body-item">
		// 		<div className="body-item-1">
		// 			<div className="play">
		// 				<i className="icon-play"></i>
		// 			</div>
		// 		</div>
		// 		<div className="title body-item-2">Breaking Bad</div>
		// 		<div className="properties body-item-3">
		// 			<span className="match">% 98 Match</span>
		// 			<span className="year">2012</span>
		// 			<span className="age-limit">13+</span>
		// 			<span className="time">2h 13m</span>
		// 		</div>
		// 		<p className="description body-item-4">
		// 			Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius alias
		// 			libero..
		// 		</p>
		// 		<div className="body-item-5">
		// 			<i className="details-icon icon-chevron-down"></i>
		// 		</div>
		// 		<div className="icon-set body-item-6">
		// 			<i className="icon-thumbs-up"></i>
		// 			<i className="icon-thumbs-down"></i>
		// 			<i className="icon-plus"></i>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default SliderItem;

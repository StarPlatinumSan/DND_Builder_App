import React, { useState, useRef } from "react";

/* 
 * =============================================================================
 *                          Slidedown Component
 *          Created by StarPlatinumSan (github.com/StarPlatinumSan)
 * -----------------------------------------------------------------------------
 *
 * 
Made for React & Typescript

This component is designed for use with the latest versions of React, as native slidedown components are not provided out of the box. 
You can customize the appearance by modifying the CSS classes:
- `.slidedown`: Controls the style of the title and overall structure.
- `.slidedown-content`: Optional for styling the sliding content, as you can also apply custom classes directly to the elements inside the slidedown.

It functions as both a clickable and hover-activated slidedown, offering flexible interaction modes to suit various user experiences.

### Example:
<SlidePlatinum title="Your title here" duration={0.3} trigger="click">
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ex velit nisi quaerat.
	</p>
</SlidePlatinum>

### Props:
- **`title`** (string): The title or trigger text for the slidedown component.
- **`duration`** (number, optional): Animation duration in seconds. Default is `0.3`.
- **`trigger`** ("click" | "hover"): Determines how the slidedown is triggered—either by clicking or hovering.
- **`position`** (optional): The CSS position of the sliding content. Accepts values like "absolute", "relative", etc. Default is "absolute" which is often preferred.
- **`children`** (ReactNode): The content you usually add inside the slidedown component (i.e. a <p></p> HTML hook)

### Notes:
- Customize the title text style by targeting `.slidedown` in your CSS.
- You can directly add class names or inline styles to the content inside the slidedown for additional customization.

Enjoy creating with this customizable and reusable component!
*/

type SlidePlatinumProps = {
	title: string;
	children: React.ReactNode;
	trigger: "click" | "hover";
	duration?: number;
	position?: "static" | "absolute" | "relative" | "fixed" | "sticky";
	className: string;
};

const SlidePlatinum: React.FC<SlidePlatinumProps> = ({ title, children, trigger, duration = "0.3", position = "absolute", className }) => {
	const [isOpen, setIsOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const contentHeight = isOpen ? contentRef.current?.scrollHeight : 0;

	return (
		<div>
			<div
				className={`${className}`}
				onClick={trigger === "click" ? () => setIsOpen(!isOpen) : undefined}
				style={{ cursor: trigger === "click" ? "pointer" : "default", position: "relative" }}
				onMouseEnter={trigger === "hover" ? () => setIsOpen(true) : undefined}
				onMouseLeave={trigger === "hover" ? () => setIsOpen(false) : undefined}
			>
				<div className="slidedown">{title}</div>

				<div className="slidedown-content" ref={contentRef} style={{ height: isOpen ? `${contentHeight}px` : 0, overflow: "hidden", transition: `all ${duration}s ease`, position: `${position}` }}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default SlidePlatinum;

<script>
export default{
    name: 'Loader'
}
</script>

<template>
<div>
	<svg class="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
				<stop offset="0%" />
				<stop offset="33%" />
				<stop offset="67%" />
				<stop offset="100%" />
			</linearGradient>
			<linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
				<stop offset="0%" />
				<stop offset="33%" />
				<stop offset="67%" />
				<stop offset="100%" />
			</linearGradient>
		</defs>
		<g fill="none" stroke-linecap="round" stroke-width="16">
			<g class="ip__track" stroke="#ddd">
				<path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
				<path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
			</g>
			<g stroke-dasharray="180 656">
				<path class="ip__worm1" stroke="url(#grad1)" stroke-dashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
				<path class="ip__worm2" stroke="url(#grad2)" stroke-dashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
			</g>
		</g>
	</svg>
</div>
</template>

<style lang="scss" scoped>
@use '../assets/style/generals/variables' as *;

:root {
	--trans-dur: 0.3s;
}

#grad1 {
	stop{
		&:nth-child(1){
			stop-color: $primary;
		}
		&:nth-child(2){
			stop-color: $secondary;
		}
		&:nth-child(3){
			stop-color: $accent;
		}
		&:nth-child(4){
			stop-color: $accent;
		}
	}
}

#grad2 {
	stop{
		&:nth-child(4){
			stop-color: $primary;
		}
		&:nth-child(3){
			stop-color: $secondary;
		}
		&:nth-child(2){
			stop-color: $accent;
		}
		&:nth-child(1){
			stop-color: $accent;
		}
	}
}
.ip {
	width: 16em;
	height: 8em;
}

.ip__worm1,
.ip__worm2 {
	animation: worm1 2s linear infinite;
}
.ip__worm2 {
	animation-name: worm2;
}

.ip__track {
	stroke: transparent;
}

/* Animation */
@keyframes worm1 {
	from {
		stroke-dashoffset: 0;
	}
	50% {
		animation-timing-function: steps(1);
		stroke-dashoffset: -358;
	}
	50.01% {
		animation-timing-function: linear;
		stroke-dashoffset: 358;
	}
	to {
		stroke-dashoffset: 0;
	}
}
@keyframes worm2 {
	from {
		stroke-dashoffset: 358;
	}
	50% {
		stroke-dashoffset: 0;
	}
	to {
		stroke-dashoffset: -358;
	}
}
</style>
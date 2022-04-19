precision mediump float;

varying vec2 vUv;
varying float vElevation;

uniform vec3 uColor;
uniform sampler2D uTexture;

void main()
{
	  vec4 textureColor = texture2D(uTexture, vUv);
		textureColor.rgb *= vElevation * 2.0 + 0.8;
		gl_FragColor = textureColor;
}
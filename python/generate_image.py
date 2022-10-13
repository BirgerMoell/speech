from torch import autocast
from diffusers import StableDiffusionPipeline, StableDiffusionImg2ImgPipeline
import requests
from PIL import Image
from io import BytesIO

pipe = StableDiffusionPipeline.from_pretrained(
        "CompVis/stable-diffusion-v1-4", 
        use_auth_token=True
).to("cuda")

def dummy(images, **kwargs):
    return images, False
    
pipe.safety_checker = dummy

def generate_image(prompt, file_name="generation.png", num_inference_steps=50):
    with autocast("cuda"):
        image = pipe(prompt=prompt, num_inference_steps=num_inference_steps)["sample"][0]
        if len(file_name) > 256:
            file_name = file_name[:256]
        image.save(file_name)
        return file_name

def upscale_image(image):
    return image

def generate_with_image(prompt="A fantasy landscape, trending on artstation", file_name="generated.png", image_url="https://raw.githubusercontent.com/CompVis/stable-diffusion/main/assets/stable-samples/img2img/sketch-mountains-input.jpg", num_inference_steps=50):
    response = requests.get(image_url)
    init_image = Image.open(BytesIO(response.content)).convert("RGB")
    init_image = init_image.resize((768, 512))
    with autocast("cuda"):
        images = pipe(prompt=prompt, init_image=init_image, strength=0.5, guidance_scale=7.5, num_inference_steps=num_inference_steps).images
    if len(file_name) > 256:
            file_name = file_name[:256]
    images[0].save(file_name)
    return file_name

def save_image(image, filename):
    from PIL import Image
    img = Image.open(image)
    img = img.save(filename)

# prompt="salvador dali a man walking towards a staircase"
# file_name="dali2.png"

# generate_image(prompt, file_name)
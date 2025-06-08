import os
from PIL import Image ,ImageOps
UPLOAD_FOLDER = 'server_images'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def store_on_server(original,ref):
    
    try:
        print("HELLO FROM FUNCTION")
        
        img = Image.open(original)
        filename_wo_ext = os.path.splitext(original.filename)[0]
        og_filename = f"{filename_wo_ext}.png"
        png_path = os.path.join(UPLOAD_FOLDER, og_filename)
        img = ImageOps.exif_transpose(img)
        img.save(png_path, 'PNG')
        
        img = Image.open(ref)
        filename_wo_ext = os.path.splitext(ref.filename)[0]
        ref_filename = f"{filename_wo_ext}.png"
        png_path = os.path.join(UPLOAD_FOLDER, ref_filename)
        img = ImageOps.exif_transpose(img)
        img.save(png_path, 'PNG')
        print("Stored Successfull...")
        
        return {"status":200,"msg":f"File Stored on Server Successfully"
                , "og_filename":f"{og_filename}","ref_filename":f"{ref_filename}"}
    except BaseException as e:
        
        print(f"Error in Storing File on Server in Store_On_Server Function {e}")
        
        return {"status":201,"msg":f"Error in Storing File on Server in Store_On_Server Function {e}"
                , "og_filename":"null","ref_filename":"null"}
    
    return og_filename , ref_filename

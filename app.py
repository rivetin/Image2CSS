from PIL import Image #PILLOW- Python library that adds support for opening, manipulating, and saving many different image file formats.


def listToString(s):

    # initialize an empty string
    str1 = ""

    # traverse in the string
    for ele in s:
        str1 += ele

    # return string
    return str1


def write_css(box_shadow):
    print('Writing css')
    css = '''body {
    background: black;  
    display:flex;
    justify-content: center;
    align-items: center;
    }
    #image {
        margin: 100px;
        margin-left: -900px;
        width: 0;
        height: 0;
        box-shadow:'''+box_shadow[:-1]+''';}'''

    with open('style.css', 'w') as fh:
        fh.write(css)


img = Image.open('./sign.jpg') # open()- To load an image from a file
pixels = img.load()
width, height = img.size


box_shadow = [] # List Initializatin
for y in range(0, height, 2):      # this row
    for x in range(0, width, 2):
        print('.')
        r, g, b = pixels[x, y]
        hexv = f"#{r:02x}{g:02x}{b:02x}" # Hexcode parsing
        box_shadow.append(f'\n{x}px  {y}px 4px 5px {hexv},')


box_shadow = listToString(box_shadow)

write_css(box_shadow)

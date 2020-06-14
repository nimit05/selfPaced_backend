# pdf_splitting.py

from PyPDF2 import PdfFileReader, PdfFileWriter
import sys


def split(path, name_of_split, start, end):
    start = int(start)
    end = int(end)
    pdf = PdfFileReader(path)
    pdf_writer = PdfFileWriter()
    while start != end+1:
        pdf_writer.addPage(pdf.getPage(start))
        start = start + 1

    output = f'{name_of_split}.pdf'
    with open(output, 'wb') as output_pdf:
        pdf_writer.write(output_pdf)
        print("done")


path = sys.argv[1]
output = sys.argv[2]
start = sys.argv[3]
end = sys.argv[4]
print(sys.argv)
split(path, output, start, end)

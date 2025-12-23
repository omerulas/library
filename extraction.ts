import { useMessage } from '@/stores/message';
import { useProcess } from '@/stores/process';
import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url'

// --- PDF.js Worker ---
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

export async function LoadPDF(file: File | null) : Promise<PDFDocumentProxy | undefined> {
    if (!file) return;

    // --- Stores ---
    const process = useProcess();
    const message = useMessage();

    try {
        // Islemler bitene kadar
        // process yuklemesi true olsun
        process.loading = true;

        // Dosyanin array bufferlarini al
        const buffers = await file.arrayBuffer();

        // Bufferlari pdf.js e yüklesin
        const payload = pdfjsLib.getDocument(buffers);

        // PDF.jsin olusturdugu dokumani al
        const pdf = await payload.promise;

        return pdf;
    }
    catch (error: any) { message.show("PDF ayıklama hatası oluştu"); }
    finally { process.loading = false; }
}

export async function getBlobPerPage(pdf: PDFDocumentProxy | undefined, index: number) {
    if (!pdf) return;

    // --- Stores ---
    const process = useProcess();
    const message = useMessage();

    try {
        // Islemler bitene kadar
        // process yuklemesi true olsun
        process.loading = true;
        
        // PDF dokumanindaki sayfayi al
        const page = await pdf.getPage(index);

        // Cozunurluk ve kalite icin bir viewport olustur
        const viewport = page.getViewport({ scale: 3.0 });

        // Canvas elementi olustur ve contexti al
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) throw new Error('Canvas 2D context alınamadı');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Canvas uzerinde sayfayı olustur
        await page.render({
            canvas: canvas,
            viewport: viewport
        }).promise

        // Olusan sayfanin blobunu al ve don
        return await new Promise<Blob | null>((resolve) => {
            canvas.toBlob(resolve, 'image/webp', 1.0)
        })
    }
    catch (error: any) { message.show("Canvas blobu alınamadı") }
    finally { process.loading = false; }
}
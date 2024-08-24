export default PdfGenerator;
declare class PdfGenerator {
    PDFDocument: any;
    getStream: {
        (stream: import("stream").Stream, options?: getStream.OptionsWithEncoding): Promise<string>;
        buffer(stream: import("stream").Stream, options?: getStream.Options): Promise<Buffer>;
        array<StreamObjectModeType>(stream: import("stream").Stream, options?: getStream.Options): Promise<StreamObjectModeType[]>;
        array(stream: import("stream").Stream, options: getStream.OptionsWithEncoding<"buffer">): Promise<Buffer[]>;
        array(stream: import("stream").Stream, options: getStream.OptionsWithEncoding<BufferEncoding>): Promise<string[]>;
        MaxBufferError: {
            new (): {
                readonly name: "MaxBufferError";
                message: string;
                stack?: string;
            };
            captureStackTrace(targetObject: object, constructorOpt?: Function): void;
            prepareStackTrace?: ((err: Error, stackTraces: NodeJS.CallSite[]) => any) | undefined;
            stackTraceLimit: number;
        };
    };
    top: number;
    item: number;
    lastHeight: number;
    margin: {
        top: number;
        left: number;
        right: number;
        bottom: number;
    };
    empty: string;
    startPdf(options: any): Promise<any>;
    generateHeader(doc: any, options: any): Promise<void>;
    generateFooter(doc: any, options: any): Promise<void>;
    getVariable(keys: any, data: any): any;
    parseVariables(text: any, data: any): any;
    generateElement(doc: any, layoutItem: any, data: any): void;
    createInvoice(options: any, order: any): Promise<string>;
    createReturnInvoice(order: any, returnItems: any): Promise<string>;
}
import getStream from "get-stream";

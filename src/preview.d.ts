import type {PreprocessorGroup} from 'svelte/types/compiler/preprocess'

type PreviewProcessorOptions = {} 
export type previewProcessor = (options: PreviewProcessorOptions) => PreprocessorGroup
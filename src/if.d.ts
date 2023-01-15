import type {PreprocessorGroup} from 'svelte/types/compiler/preprocess'

type PreviewProcessorOptions = {} 
export type PreviewProcessor = (options: IfProcessorOptions) => PreprocessorGroup

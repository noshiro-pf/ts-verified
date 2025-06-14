import { Autocomplete } from '@mui/material';
import { castMutable } from 'ts-verified';

const readonlyOptions: readonly string[] = ['Option 1', 'Option 2', 'Option 3'];

const SomeComponent: React.FC = () => {
    // Component implementation
    return (
        <Autocomplete
            // Use castMutable to safely pass readonly array to mutable API. This is safer than casting with `as`, as it simply changes type `readonly T[]` to `T[]`.
            options={castMutable(readonlyOptions)}
            // ...
        />
    );
};

// Immer.js example - draft properties need mutable types
import { produce } from 'immer';

type State = Readonly<{
    items: readonly string[];
}>;

const initialState: State = {
    items: ['item1', 'item2'],
} as const;

const newItems: readonly string[] = ['newItem1', 'newItem2'];

const updatedState = produce(initialState, (draft) => {
    // draft.items expects mutable array, but newItems is readonly
    draft.items = castMutable(newItems); // Safe cast for assignment
});

console.log(updatedState.items); // ['newItem1', 'newItem2']
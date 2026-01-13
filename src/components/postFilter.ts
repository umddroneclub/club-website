export function postFilter(){
    document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('search') as HTMLInputElement;
    const sortInput = document.getElementById('sort') as HTMLInputElement;
    const tagInput = document.getElementById('tag') as HTMLInputElement;
    const list = document.getElementById('post-list')!;
    const originalItems = Array.from(list.children) as HTMLElement[];

    function update() {
        const query = input.value.toLowerCase();
        const tagKey = tagInput.value;
        const sortKey = sortInput.value;

        const tagFiltered = tagKey != "no-tag"
            ? originalItems.filter(item => item.dataset.tag === tagKey)
            : originalItems;

        const searchFiltered = query
            ? tagFiltered.filter(item => item.dataset.title?.includes(query))
            : tagFiltered;

        searchFiltered.sort((a, b) => {
        if (sortKey === 'new') {
            return new Date(b.dataset.date!).getTime() - new Date(a.dataset.date!).getTime();
        }
        if (sortKey === 'old') {
            return new Date(a.dataset.date!).getTime() - new Date(b.dataset.date!).getTime();
        }
        return a.dataset.title!.localeCompare(b.dataset.title!);
        });

        list.innerHTML = '';
        searchFiltered.forEach(item => list.appendChild(item));
    }

    input.addEventListener('input', update);
    sortInput.addEventListener('change', update);
    tagInput.addEventListener('change', update);
    });
}
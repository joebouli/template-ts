export default abstract class Component {
    abstract element: HTMLElement; // Abstract property that must be implemented by subclasses

    // Method to render the component's element into a parent element
    public render(parent: HTMLElement | Component) {
        if (parent instanceof Component) {
            parent.element.appendChild(this.element);
        } else {
            parent.appendChild(this.element);
        }

    }
}
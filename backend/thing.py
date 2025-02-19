import graphviz

# Define the suffix tree structure
class SuffixTreeNode:
    def __init__(self):
        self.children = {}
        self.index = None

class SuffixTree:
    def __init__(self, text):
        self.root = SuffixTreeNode()
        self.text = text
        self.build_suffix_tree()

    def insert_suffix(self, suffix, index):
        node = self.root
        for char in suffix:
            if char not in node.children:
                node.children[char] = SuffixTreeNode()
            node = node.children[char]
        node.index = index

    def build_suffix_tree(self):
        for i in range(len(self.text)):
            self.insert_suffix(self.text[i:], i)

    def visualize(self):
        dot = graphviz.Digraph()
        self._visualize_helper(self.root, dot, "root")
        return dot

    def _visualize_helper(self, node, dot, node_name):
        for char, child in node.children.items():
            child_name = f"{node_name}_{char}"
            dot.node(child_name, char)
            dot.edge(node_name, child_name)
            self._visualize_helper(child, dot, child_name)

# Construct the suffix tree for "ueeeuuuu$"
text = "ueeeuuuu$"
suffix_tree = SuffixTree(text)

# Generate and display the suffix tree visualization
suffix_tree.visualize().view()
# suffix_tree.visualize().view()

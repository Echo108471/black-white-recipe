class SuffixTreeNode:
    def __init__(self):
        self.children = {} 
        self.start_index = -1 

class NaiveSuffixTree:
    def __init__(self, text):
        self.root = SuffixTreeNode()
        self.text = text
        self.build_suffix_tree()

    def build_suffix_tree(self):
        n = len(self.text)
        for i in range(n):
            current = self.root
            for j in range(i, n):
                if self.text[j] not in current.children:
                    current.children[self.text[j]] = SuffixTreeNode()
                    current.children[self.text[j]].start_index = i
                current = current.children[self.text[j]]

    def search_pattern(self, pattern):
        current = self.root
        for char in pattern:
            if char in current.children:
                current = current.children[char]
            else:
                return []
        return self.collect_suffixes(current)

    def collect_suffixes(self, node):
        results = []
        if node.start_index != -1:
            results.append(node.start_index)
        for child in node.children.values():
            results.extend(self.collect_suffixes(child))
        return results


    def print_tree(self, node=None, depth=0):
        if node is None:
            node = self.root
        for char, child in node.children.items():
            print("  " * depth + f"{char} ({child.start_index})")
            self.print_tree(child, depth + 1)

text = "yabbadabbadp$"
suffix_tree = NaiveSuffixTree(text)
pattern = "bad"
print("Pattern found at indices:", suffix_tree.search_pattern(pattern))

print("Suffix Tree:")
suffix_tree.print_tree()



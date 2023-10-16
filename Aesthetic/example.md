<!-- example Markdown file -->

<!-- css style -->

<script src="import.js" defer></script>
<!-- <script defer>
	window.addEventListener("load", function() {
        document.color.setColor("blue");
      });
</script> -->
<!-- <script defer>
  window.addEventListener("load", function() {
        document.font.setMermaidFont("helvetica");
      });
</script> -->


<!--  --

<!-- Document start -->

# This is a level 1 heading

<plan></plan>

## This is a level 2 heading

### This is a level 3 heading

#### This is a level 4 heading

##### This is a level 5 heading

###### This is a level 6 heading

This is a paragraph of text. Here's a [link](https://www.youtube.com/) to an external website.

Here's an unordered list:
- Item 1
- Item 2
- Item 3
  - Subitem 1
  - Subitem 2



Here's an ordered list:
1. First item
2. Second item
3. Third item
    1. Subitem 1
    2. Subitem 2

> This is a blockquote. It can span multiple lines.
>
> Here's a second paragraph in the blockquote.

<v>
This is a verse block.
</v>

<div class="definition">
    Here's a definition
</div>

<div class="note">
    Here's a note
</div>

<div class="warning">
    Here's a warning
</div>

<div class="tip">
    Here's a tip
</div>

<div class="important">
    Here's something important
</div>

<div class="error"> 
    Here's an error
</div>

<div class="success">
    Here's a success
</div>

<div class="abstract">
    Here's an abstract
</div>

<div class="example">
    Here's an example
</div>

<div class="question">
    Here's a question
</div>

<div class="quote">
    Here's a quote
</div>

<div class="bug">
    Here's an bug
</div>

<pagebreak></pagebreak>

Here are my custom color or highlight elements : 

<red>This is a red text</red>

<green>This is a green text</green>

<blue>This is a blue text</blue>

<yellow>This is a yellow text</yellow>

<orange>This is an orange text</orange>

<purple>This is a purple text</purple>

<pink>This is a pink text</pink>

<grey>This is a grey text</grey>

<hred>This is a red highlight</hred>

<hgreen>This is a green highlight</hgreen>

<hblue>This is a blue highlight</hblue>

<hyellow>This is a yellow highlight</hyellow>

<horange>This is an orange highlight</horange>

<hpurple>This is a purple highlight</hpurple>

<hpink>This is a pink highlight</hpink>

<hgrey>This is a grey highlight</hgrey>

Here's some inline code: `console.log('Hello, world!');`

Here's a code block:

```javascript
function add(a, b) {
    a = a + 1;
    b = 2 + 1 + 2;
  return a + b;
}
```

Here's an image:

![Image alt text](image.png)

Here's some **bold** text and some *italic* text.

Here's a table:

| Column 1 | Column 2 |
| -------- | -------- |
| Item 1   | Item 2   |
| Item 3   | Item 4   |

Here's a horizontal rule:

---

Here's a footnote[^1].

[^1]: This is a footnote.

This is my <fnote>custom footnote || And here is the explaination</fnote>

Here is a <fnote>second custom footnote || And here is the explaination of the second one</fnote>

Here's a definition list:

Term 1 
: Definition 1

Term 2
: Definition 2

Here's a task list:

- [x] Task 1
- [ ] Task 2
- [ ] Task 3
- [X] Task 4

Here's an abbreviation: HTML

Here's a math block:

$$
\frac{1}{n^{2}}
$$


Here's a math inline: $\frac{1}{n^{2}}$

Here's a superscript: 10<sup>2</sup>

Here's a subscript: H<sub>2</sub>O

Here's a strikethrough: ~~strikethrough~~

Here's a comment: <!-- This is a comment -->

Here's some emoji: 🐻

This is a mermaid diagram:

```mermaid
graph LR;
    A-->|text goes here|B;
    A-->|text goes here|C;
    B-->D[here is a very long node,<br> i want to break it into multiple lines];
    C-->D;

    subgraph S[Group Name]
        D-->|text|E;
    end
```

```mermaid
graph LR

0((q0)) -->|"[0-9]"| 1(((q1)))
1 -->|"[0-9]"| 1
1 --> N[number]
0 -->|"[a-zA-Z]"| 2(((q2)))
2 -->|"[a-zA-Z0-9_]"| 2
2 --> I[identifier]
2 -->|if matches a keyword| K["keyword (specific token)"]
0 -->|"[\ s \ n]"| 0
3 -->|"-"| 5((q5))
5 -->|"\w"| 5
5 -->|"\ n"| 6(((q6)))
6 --> C[/comment/]
0 -->|"[+, -, *, /, <, >, =, .]"| 3(((q3)))
3 -->|"-"| 4b(((q4b)))
3 -->|"[+, *, /, <, >, =, .]"| 4(((q4)))
4b -->|"-"| 5
4 --> O[operator]
4b --> O[operator]
0 -->|"'"| 7((q7))
7 -->|"\w"| 8((q8))
8 -->|"'"| 9(((q9)))
8 -->|"\w"| e1{{error}}
9 --> Ca[character]
```

Here's a sequence diagram:

```mermaid
sequenceDiagram
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```

Here's a class diagram:

```mermaid
classDiagram
    class Animal {
        -name: string
        -age: int
        +eat(): void
        +sleep(): void
    }
    class Dog {
        -breed: string
        +bark(): void
    }
    class Cat {
        -color: string
        +meow(): void
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

Here's a plantuml diagram:

```plantuml
@startuml
class Animal {
    -name: string
    -age: int
    +eat(): void
    +sleep(): void
}
class Dog {
    -breed: string
    +bark(): void
}
class Cat {
    -color: string
    +meow(): void
}
Animal <|-- Dog
Animal <|-- Cat
@enduml
```

<bluebox>
    Phasellus egestas feugiat aliquet. Proin ut sollicitudin diam. Sed at commodo est. Fusce non volutpat orci. Cras semper auctor hendrerit. Integer molestie efficitur augue, ac tincidunt ante pulvinar id. Nunc urna velit, pharetra vitae tincidunt et, pulvinar ac quam. Vivamus ornare at sem nec iaculis. Integer nec tortor convallis, mattis ante sit amet, bibendum magna. Nunc suscipit tellus nec pretium placerat. Nullam maximus dictum gravida. Nullam euismod lobortis velit eget sodales.
</bluebox>

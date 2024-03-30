<!-- example Markdown file -->

<!-- css style -->

<script src="import.js" defer></script>
<script defer>
	window.addEventListener("load", function() {
        // document.color.setColor("red");
        changeCodeHighlightTheme("monokai-sublime");
      });
</script>

<!-- Document start -->

# CheatSheet

## Boxes Section

### Subsection 1

#### Subsubsection 1

##### Subsubsubsection 1


<whitebox>
    <h6 class="yellowtitle">this it the title of the box</h6>
    there is a bit of content for this box
</whitebox>

<div class="grid-container c2">
	<div class="grid-item">
        <bluebox>
            <h6 class="yellowtitle">this it the title of the box</h6>
            there is a bit of content for this box
        </bluebox>
	</div>
	<div class="grid-item">
        <bluebox>
            <h6 class="yellowtitle">this it the title of the box</h6>
            <p>there is a bit of content for this box</p>
        </bluebox>
	</div>
</div>

<colorformula>
    <h6 class="yellowftitle">this it the title of the box</h6>
    <p>there is a bit of content for this box</p>
</colorformula>
<tab></tab>
<redformula>
    <h6 class="greenftitle">this it the title of the box</h6>
    <p>there is a bit of content for this box</p>
</redformula>

<whitebox>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</whitebox>

<bluebox>
    <h6>this it the title of the box</h6>
    there is a bit of content or this box
</bluebox>

<redbox>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</redbox>

<greenbox>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</greenbox>

<yellowbox>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</yellowbox>

<pinkbox>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</pinkbox>

<orangebox>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</orangebox>

<purplebox>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</purplebox>

<whiteformula>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</whiteformula>
<blueformula>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</blueformula>
<redformula>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</redformula>
<orangeformula>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</orangeformula>
<greenformula>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</greenformula>
<yellowformula>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</yellowformula>
<purpleformula>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</purpleformula>
<pinkformula>
    <h6>this it the title of the box</h6>
    there is a bit of content for this box
</pinkformula>



## Code Section

### Direct code

```python
def function():
    print("Hello World")
```

```javascript
function function() {
    console.log("Hello World");
}
```

### Code in a box

<bluebox>
    <pre>
        <code class="language-python">def function():
print("Hello World")</code>
    </pre>
</bluebox>

<pre>
    <code class="language-python">
        def function():
            print("Hello World")
    </code>
</pre>


<bluebox>
    <pre>
        <code>
            function function() {
                console.log("Hello World");
            }
        </code>
    </pre>
</bluebox>

<bluebox>
    <pre>
        <code class="language-cpp">
            include &lt;iostream&gt;
            using namespace std;
        </code>
    </pre>
</bluebox>


### Code in a box with no pre

<code class="language-python">
    def function():
        print("Hello World")
</code>

<bluebox>
    <code class="language-python">
        def function():
            print("Hello World")
    </code>
</bluebox>

<bluebox>
    <code class="language-javascript">
        function function() {
            console.log("Hello World");
        }
    </code>
</bluebox>

<code class="language-javascript">
        function function() {
            console.log("Hello World");
        }
</code>

`this is an inline text`

`def function()`
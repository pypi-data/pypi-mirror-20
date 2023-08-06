import "test-case.jsx";
import "query-parser.jsx";

class _Test extends TestCase
{
    var parser : QueryParser;

    override function setUp () : void
    {
        this.parser = new QueryParser();
    }

    function test_and () : void
    {
        this.parser.parse(['word1', 'word2']);
        this.expect(this.parser.queries.length).toBe(2);

        this.expect(this.parser.queries[0].word).toBe('word1');
        this.expect(this.parser.queries[0].or).toBe(false);
        this.expect(this.parser.queries[0].not).toBe(false);
        this.expect(this.parser.queries[0].raw).toBe(false);

        this.expect(this.parser.queries[1].word).toBe('word2');
        this.expect(this.parser.queries[1].or).toBe(false);
        this.expect(this.parser.queries[1].not).toBe(false);
        this.expect(this.parser.queries[1].raw).toBe(false);
    }

    function test_or () : void
    {
        this.parser.parse(['word1', 'OR', 'word2']);
        this.expect(this.parser.queries.length).toBe(2);

        this.expect(this.parser.queries[0].word).toBe('word1');
        this.expect(this.parser.queries[0].or).toBe(false);
        this.expect(this.parser.queries[0].not).toBe(false);
        this.expect(this.parser.queries[0].raw).toBe(false);

        this.expect(this.parser.queries[1].word).toBe('word2');
        this.expect(this.parser.queries[1].or).toBe(true);
        this.expect(this.parser.queries[1].not).toBe(false);
        this.expect(this.parser.queries[1].raw).toBe(false);
    }

    function test_not () : void
    {
        this.parser.parse(['word1', '-word2']);
        this.expect(this.parser.queries.length).toBe(2);

        this.expect(this.parser.queries[0].word).toBe('word1');
        this.expect(this.parser.queries[0].or).toBe(false);
        this.expect(this.parser.queries[0].not).toBe(false);
        this.expect(this.parser.queries[0].raw).toBe(false);

        this.expect(this.parser.queries[1].word).toBe('word2');
        this.expect(this.parser.queries[1].or).toBe(false);
        this.expect(this.parser.queries[1].not).toBe(true);
        this.expect(this.parser.queries[1].raw).toBe(false);
    }

    function test_raw () : void
    {
        this.parser.parse(['word1', '"word2"']);
        this.expect(this.parser.queries.length).toBe(2);

        this.expect(this.parser.queries[0].word).toBe('word1');
        this.expect(this.parser.queries[0].or).toBe(false);
        this.expect(this.parser.queries[0].not).toBe(false);
        this.expect(this.parser.queries[0].raw).toBe(false);

        this.expect(this.parser.queries[1].word).toBe('word2');
        this.expect(this.parser.queries[1].or).toBe(false);
        this.expect(this.parser.queries[1].not).toBe(false);
        this.expect(this.parser.queries[1].raw).toBe(true);
    }

    function test_raw_not () : void
    {
        this.parser.parse(['word1', '-"word2"']);
        this.expect(this.parser.queries.length).toBe(2);

        this.expect(this.parser.queries[0].word).toBe('word1');
        this.expect(this.parser.queries[0].or).toBe(false);
        this.expect(this.parser.queries[0].not).toBe(false);
        this.expect(this.parser.queries[0].raw).toBe(false);

        this.expect(this.parser.queries[1].word).toBe('word2');
        this.expect(this.parser.queries[1].or).toBe(false);
        this.expect(this.parser.queries[1].not).toBe(true);
        this.expect(this.parser.queries[1].raw).toBe(true);
    }
}

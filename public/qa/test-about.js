suite('"About" Page Tests', function(){
    test('Page should contain link to contact page', function(){
    assert($('a[href="/contact"]').length);
    });
});
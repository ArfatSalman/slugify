import test from 'ava';
import slugify from '.';

test('main', t => {
	t.is(slugify('Foo Bar'), 'foo-bar');
	t.is(slugify('foo bar baz'), 'foo-bar-baz');
	t.is(slugify('foo bar '), 'foo-bar');
	t.is(slugify('       foo bar'), 'foo-bar');
	t.is(slugify('[foo] [bar]'), 'foo-bar');
	t.is(slugify('Foo ÿ'), 'foo-y');
	t.is(slugify('FooBar'), 'foo-bar');
	t.is(slugify('fooBar'), 'foo-bar');
	t.is(slugify('UNICORNS AND RAINBOWS'), 'unicorns-and-rainbows');
	t.is(slugify('Foo & Bar'), 'foo-and-bar');
	t.is(slugify('Foo & Bar'), 'foo-and-bar');
	t.is(slugify('Hællæ, hva skjera?'), 'haellae-hva-skjera');
	t.is(slugify('Foo Bar2'), 'foo-bar2');
	t.is(slugify('I ♥ Dogs'), 'i-love-dogs');
	t.is(slugify('Déjà Vu!'), 'deja-vu');
	t.is(slugify('fooBar 123 $#%'), 'foo-bar-123');
	t.is(slugify('foo🦄'), 'foo-unicorn');
	t.is(slugify('🦄🦄🦄'), 'unicorn-unicorn-unicorn');
	t.is(slugify('foo&bar'), 'foo-and-bar');
});

test('custom separator', t => {
	t.is(slugify('foo bar', {separator: '_'}), 'foo_bar');
	t.is(slugify('BAR&baz', {separator: '_'}), 'bar_and_baz');
	t.is(slugify('Déjà Vu!', {separator: '-'}), 'deja-vu');
	t.is(slugify('UNICORNS AND RAINBOWS!', {separator: '@'}), 'unicorns@and@rainbows');
	t.is(slugify('[foo] [bar]', {separator: '.'}), 'foo.bar', 'escape regexp special characters');
});

test('custom replacements', t => {
	t.is(slugify('foo | bar', {
		customReplacements: [
			['|', 'or']
		]
	}), 'foo-or-bar');

	t.is(slugify('10 | 20 %', {
		customReplacements: [
			['|', 'or'],
			['%', 'percent']
		]
	}), '10-or-20-percent');

	t.is(slugify('I ♥ 🦄', {
		customReplacements: [
			['♥', 'amour'],
			['🦄', 'licorne']
		]
	}), 'i-amour-licorne');

	t.is(slugify('x.y.z', {
		customReplacements: [
			['.', '']
		]
	}), 'xyz');
});

.PHONY: clean clean-pyc clean-build

test:
	python -m pytest --cov=guide_search unit_tests --cov-report=html:cover

testdebug:
	python -m pytest -s -v unit_tests/test_cases.py

# -m : search sys.path for module and run it
# -s : disable capture of stdout & stdin so can attach debugger
# -v : show full diff

#python -m pytest -s --cov=guide_search unit_tests


dist: clean-build
	@python setup.py sdist bdist_wheel

clean: clean-build clean-pyc

clean-build:
	-@rm -fr build/
	-@rm -fr dist/
	-@rm -fr *.egg-info
	-@rm -fr cover/
	-@rm -fr test-reports

clean-pyc:
	-@find . -name '*.pyc' -exec rm -f {} +
	-@find . -name '*.pyo' -exec rm -f {} +
	-@find . -name '*~' -exec rm -f {} +
	-@find . -name '__pycache__' -exec rm -fr {} +

publish:
	@twine upload dist/*

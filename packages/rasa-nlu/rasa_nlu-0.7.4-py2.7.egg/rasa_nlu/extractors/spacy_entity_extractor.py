from __future__ import unicode_literals, print_function

import random

import pathlib
from spacy.gold import GoldParse
from spacy.pipeline import EntityRecognizer
import warnings


class SpacyEntityExtractor(object):
    def __init__(self, nlp=None, extractor_file=None, should_fine_tune_spacy_ner=False):
        self.nlp = nlp
        if extractor_file:
            self.ner = EntityRecognizer.load(pathlib.Path(extractor_file), nlp.vocab)
        else:
            self.ner = None

        self.should_fine_tune_spacy_ner = should_fine_tune_spacy_ner

    def convert_examples(self, entity_examples):
        def convert_entity(ent):
            return ent["start"], ent["end"], ent["entity"]

        def convert_example(ex):
            return ex["text"], [convert_entity(ent) for ent in ex["entities"]]

        return [convert_example(ex) for ex in entity_examples]

    def train(self, nlp, entity_examples, should_fine_tune_spacy_ner=False):
        train_data = self.convert_examples(entity_examples)
        ent_types = [[ent["entity"] for ent in ex["entities"]] for ex in entity_examples]
        entity_types = list(set(sum(ent_types, [])))

        self.should_fine_tune_spacy_ner = should_fine_tune_spacy_ner
        self.ner = self._train_from_scratch(nlp, entity_types, train_data)

    def _train_from_scratch(self, nlp, entity_types, train_data):
        ner = EntityRecognizer(nlp.vocab, entity_types=entity_types)
        self._update_ner_model(ner, nlp, train_data)
        return ner

    # TODO: this is not used at the moment as there is an issue in the latest spacy version. Currently there is no way
    # TODO: to directly fine tune the entity model as that will result in a malloc error during parse time
    def _fine_tune(self, nlp, entity_types, train_data):
        if nlp.entity:
            ner = nlp.entity
            for entity_type in entity_types:
                if entity_type not in ner.cfg['actions']['1']:
                    ner.add_label(entity_type)
            self._update_ner_model(ner, nlp, train_data)
            return ner
        else:
            warnings.warn("Failed to fine tune model. There was no model to fine tune. ")
            return None

    def _update_ner_model(self, ner, nlp, train_data):
        for itn in range(5):
            random.shuffle(train_data)
            for raw_text, entity_offsets in train_data:
                doc = nlp.make_doc(raw_text)
                gold = GoldParse(doc, entities=entity_offsets)
                ner.update(doc, gold)

    def extract_entities(self, doc):
        if self.ner is not None:
            self.ner(doc)

            if self.nlp.entity is not None and self.should_fine_tune_spacy_ner:
                sp_doc = self.nlp(doc.text)
                spacy_ents = sp_doc.ents
                for spacy_ent in spacy_ents:
                    for e in doc.ents:
                        if e.start_char <= spacy_ent.start_char < e.end_char or \
                              e.start_char <= spacy_ent.end_char < e.end_char:
                            break
                    else:
                        doc.ents += (spacy_ent,)

            entities = [
                {
                    "entity": ent.label_,
                    "value": ent.text,
                    "start": ent.start_char,
                    "end": ent.end_char
                }
                for ent in doc.ents]
            return entities
        else:
            return []

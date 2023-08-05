# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Style'
        db.create_table(u'cmsplugin_style', (
            ('cmsplugin_ptr', self.gf('django.db.models.fields.related.OneToOneField')(related_name='+', unique=True, primary_key=True, to=orm['cms.CMSPlugin'])),
            ('class_name', self.gf('django.db.models.fields.CharField')(default='container', max_length=50, blank=True)),
            ('id_name', self.gf('django.db.models.fields.CharField')(default='', max_length=50, blank=True)),
            ('tag_type', self.gf('django.db.models.fields.CharField')(default='div', max_length=50)),
            ('padding_left', self.gf('django.db.models.fields.SmallIntegerField')(null=True, blank=True)),
            ('padding_right', self.gf('django.db.models.fields.SmallIntegerField')(null=True, blank=True)),
            ('padding_top', self.gf('django.db.models.fields.SmallIntegerField')(null=True, blank=True)),
            ('padding_bottom', self.gf('django.db.models.fields.SmallIntegerField')(null=True, blank=True)),
            ('margin_left', self.gf('django.db.models.fields.SmallIntegerField')(null=True, blank=True)),
            ('margin_right', self.gf('django.db.models.fields.SmallIntegerField')(null=True, blank=True)),
            ('margin_top', self.gf('django.db.models.fields.SmallIntegerField')(null=True, blank=True)),
            ('margin_bottom', self.gf('django.db.models.fields.SmallIntegerField')(null=True, blank=True)),
            ('additional_class_names', self.gf('django.db.models.fields.CharField')(max_length=200, blank=True)),
        ))
        db.send_create_signal(u'aldryn_style', ['Style'])


    def backwards(self, orm):
        # Deleting model 'Style'
        db.delete_table(u'cmsplugin_style')


    models = {
        u'aldryn_style.style': {
            'Meta': {'object_name': 'Style', 'db_table': "u'cmsplugin_style'", '_ormbases': ['cms.CMSPlugin']},
            'additional_class_names': ('django.db.models.fields.CharField', [], {'max_length': '200', 'blank': 'True'}),
            'class_name': ('django.db.models.fields.CharField', [], {'default': "'container'", 'max_length': '50', 'blank': 'True'}),
            'cmsplugin_ptr': ('django.db.models.fields.related.OneToOneField', [], {'related_name': "'+'", 'unique': 'True', 'primary_key': 'True', 'to': "orm['cms.CMSPlugin']"}),
            'id_name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '50', 'blank': 'True'}),
            'margin_bottom': ('django.db.models.fields.SmallIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'margin_left': ('django.db.models.fields.SmallIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'margin_right': ('django.db.models.fields.SmallIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'margin_top': ('django.db.models.fields.SmallIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'padding_bottom': ('django.db.models.fields.SmallIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'padding_left': ('django.db.models.fields.SmallIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'padding_right': ('django.db.models.fields.SmallIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'padding_top': ('django.db.models.fields.SmallIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'tag_type': ('django.db.models.fields.CharField', [], {'default': "'div'", 'max_length': '50'})
        },
        'cms.cmsplugin': {
            'Meta': {'object_name': 'CMSPlugin'},
            'changed_date': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'creation_date': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'language': ('django.db.models.fields.CharField', [], {'max_length': '15', 'db_index': 'True'}),
            'level': ('django.db.models.fields.PositiveIntegerField', [], {'db_index': 'True'}),
            'lft': ('django.db.models.fields.PositiveIntegerField', [], {'db_index': 'True'}),
            'parent': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['cms.CMSPlugin']", 'null': 'True', 'blank': 'True'}),
            'placeholder': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['cms.Placeholder']", 'null': 'True'}),
            'plugin_type': ('django.db.models.fields.CharField', [], {'max_length': '50', 'db_index': 'True'}),
            'position': ('django.db.models.fields.PositiveSmallIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'rght': ('django.db.models.fields.PositiveIntegerField', [], {'db_index': 'True'}),
            'tree_id': ('django.db.models.fields.PositiveIntegerField', [], {'db_index': 'True'})
        },
        'cms.placeholder': {
            'Meta': {'object_name': 'Placeholder'},
            'default_width': ('django.db.models.fields.PositiveSmallIntegerField', [], {'null': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'slot': ('django.db.models.fields.CharField', [], {'max_length': '50', 'db_index': 'True'})
        }
    }

    complete_apps = ['aldryn_style']
from __future__ import unicode_literals

from rest_framework import serializers

from common.models import SharedUploadedFile

from .literals import DOCUMENT_IMAGE_TASK_TIMEOUT
from .models import (
    Document, DocumentVersion, DocumentPage, DocumentType,
    DocumentTypeFilename, RecentDocument
)
from .settings import setting_language
from .tasks import task_get_document_page_image, task_upload_new_version


class DocumentPageImageSerializer(serializers.Serializer):
    data = serializers.SerializerMethodField()

    def get_data(self, instance):
        request = self.context['request']
        size = request.GET.get('size')
        zoom = request.GET.get('zoom')
        rotation = request.GET.get('rotation')

        task = task_get_document_page_image.apply_async(
            kwargs=dict(
                document_page_id=instance.pk, size=size, zoom=zoom,
                rotation=rotation, as_base64=True
            )
        )
        return task.get(timeout=DOCUMENT_IMAGE_TASK_TIMEOUT)


class DocumentPageSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.HyperlinkedIdentityField(
        view_name='rest_api:documentpage-image'
    )

    class Meta:
        extra_kwargs = {
            'url': {'view_name': 'rest_api:documentpage-detail'},
            'document_version': {
                'view_name': 'rest_api:documentversion-detail'
            }
        }
        model = DocumentPage


class DocumentTypeFilenameSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentTypeFilename
        fields = ('filename',)


class DocumentTypeSerializer(serializers.HyperlinkedModelSerializer):
    documents_url = serializers.HyperlinkedIdentityField(
        view_name='rest_api:documenttype-document-list',
    )
    documents_count = serializers.SerializerMethodField()
    filenames = DocumentTypeFilenameSerializer(many=True, read_only=True)

    class Meta:
        extra_kwargs = {
            'url': {'view_name': 'rest_api:documenttype-detail'},
        }
        fields = (
            'delete_time_period', 'delete_time_unit', 'documents_url',
            'documents_count', 'id', 'label', 'filenames', 'trash_time_period',
            'trash_time_unit', 'url'
        )
        model = DocumentType

    def get_documents_count(self, obj):
        return obj.documents.count()


class WritableDocumentTypeSerializer(serializers.ModelSerializer):
    documents_url = serializers.HyperlinkedIdentityField(
        view_name='rest_api:documenttype-document-list',
    )
    documents_count = serializers.SerializerMethodField()

    class Meta:
        extra_kwargs = {
            'url': {'view_name': 'rest_api:documenttype-detail'},
        }
        fields = (
            'delete_time_period', 'delete_time_unit', 'documents_url',
            'documents_count', 'id', 'label', 'trash_time_period',
            'trash_time_unit', 'url'
        )
        model = DocumentType

    def get_documents_count(self, obj):
        return obj.documents.count()


class DocumentVersionSerializer(serializers.HyperlinkedModelSerializer):
    pages = DocumentPageSerializer(many=True, required=False, read_only=True)
    revert = serializers.HyperlinkedIdentityField(
        view_name='rest_api:documentversion-revert'
    )
    size = serializers.SerializerMethodField()

    class Meta:
        extra_kwargs = {
            'document': {'view_name': 'rest_api:document-detail'},
            'file': {'use_url': False},
            'url': {'view_name': 'rest_api:documentversion-detail'},
        }
        model = DocumentVersion
        read_only_fields = ('document', 'file', 'size')

    def get_size(self, instance):
        return instance.size


class WritableDocumentVersionSerializer(serializers.ModelSerializer):
    document = serializers.HyperlinkedIdentityField(
        view_name='rest_api:document-detail'
    )
    pages = DocumentPageSerializer(many=True, required=False, read_only=True)
    revert = serializers.HyperlinkedIdentityField(
        view_name='rest_api:documentversion-revert'
    )
    url = serializers.HyperlinkedIdentityField(
        view_name='rest_api:documentversion-detail'
    )

    class Meta:
        extra_kwargs = {
            'file': {'use_url': False},
        }
        model = DocumentVersion
        read_only_fields = ('document', 'file')


class DocumentVersionRevertSerializer(DocumentVersionSerializer):
    class Meta(DocumentVersionSerializer.Meta):
        read_only_fields = ('comment', 'document',)


class NewDocumentVersionSerializer(serializers.Serializer):
    comment = serializers.CharField(allow_blank=True)
    file = serializers.FileField(use_url=False)

    def save(self, document, _user):
        shared_uploaded_file = SharedUploadedFile.objects.create(
            file=self.validated_data['file']
        )

        task_upload_new_version.delay(
            comment=self.validated_data.get('comment', ''),
            document_id=document.pk,
            shared_uploaded_file_id=shared_uploaded_file.pk, user_id=_user.pk
        )


class DeletedDocumentSerializer(serializers.HyperlinkedModelSerializer):
    document_type_label = serializers.SerializerMethodField()
    restore = serializers.HyperlinkedIdentityField(
        view_name='rest_api:trasheddocument-restore'
    )

    class Meta:
        extra_kwargs = {
            'document_type': {'view_name': 'rest_api:documenttype-detail'},
            'url': {'view_name': 'rest_api:trasheddocument-detail'}
        }
        fields = (
            'date_added', 'deleted_date_time', 'description', 'document_type',
            'document_type_label', 'id', 'label', 'language', 'restore',
            'url', 'uuid',
        )
        model = Document
        read_only_fields = (
            'deleted_date_time', 'description', 'document_type', 'label',
            'language'
        )

    def get_document_type_label(self, instance):
        return instance.document_type.label


class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    document_type_label = serializers.SerializerMethodField()
    latest_version = DocumentVersionSerializer(many=False, read_only=True)
    versions = serializers.HyperlinkedIdentityField(
        view_name='rest_api:document-version-list',
    )

    class Meta:
        extra_kwargs = {
            'document_type': {'view_name': 'rest_api:documenttype-detail'},
            'url': {'view_name': 'rest_api:document-detail'}
        }
        fields = (
            'date_added', 'description', 'document_type',
            'document_type_label', 'id', 'label', 'language',
            'latest_version', 'url', 'uuid', 'versions',
        )
        model = Document
        read_only_fields = ('document_type',)

    def get_document_type_label(self, instance):
        return instance.document_type.label


class WritableDocumentSerializer(serializers.ModelSerializer):
    document_type_label = serializers.SerializerMethodField()
    latest_version = DocumentVersionSerializer(many=False, read_only=True)
    versions = serializers.HyperlinkedIdentityField(
        view_name='rest_api:document-version-list',
    )
    url = serializers.HyperlinkedIdentityField(
        view_name='rest_api:document-detail',
    )

    class Meta:
        fields = (
            'date_added', 'description', 'document_type',
            'document_type_label', 'id', 'label', 'language',
            'latest_version', 'url', 'uuid', 'versions',
        )
        model = Document
        read_only_fields = ('document_type',)

    def get_document_type_label(self, instance):
        return instance.document_type.label


class NewDocumentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(write_only=True)

    def save(self, _user):
        document = Document.objects.create(
            description=self.validated_data.get('description', ''),
            document_type=self.validated_data['document_type'],
            label=self.validated_data.get(
                'label', unicode(self.validated_data['file'])
            ),
            language=self.validated_data.get(
                'language', setting_language.value
            )
        )
        document.save(_user=_user)

        shared_uploaded_file = SharedUploadedFile.objects.create(
            file=self.validated_data['file']
        )

        task_upload_new_version.delay(
            document_id=document.pk,
            shared_uploaded_file_id=shared_uploaded_file.pk, user_id=_user.pk
        )

        self.instance = document
        return document

    class Meta:
        fields = (
            'description', 'document_type', 'id', 'file', 'label', 'language',
        )
        model = Document


class RecentDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('document', 'datetime_accessed')
        model = RecentDocument

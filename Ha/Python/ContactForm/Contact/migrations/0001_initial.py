# Generated by Django 4.1.5 on 2023-01-30 04:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullname', models.CharField(max_length=250)),
                ('companyname', models.CharField(max_length=250)),
                ('businessphonne', models.CharField(max_length=10)),
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=10)),
                ('message', models.TextField(max_length=3000)),
                ('created_at', models.DateField()),
                ('updated_at', models.DateField()),
            ],
            options={
                'db_table': 'Contact',
            },
        ),
    ]